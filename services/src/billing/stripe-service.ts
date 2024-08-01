import { StripeLineItem, StripeProductType } from '@hike/types';
import Stripe from 'stripe';

export class StripeService {
  private stripe: Stripe;

  constructor(apiKey: string) {
    this.stripe = new Stripe(apiKey, {
      apiVersion: '2024-06-20'
    });
  }

  getNextBillingDate(interval: string, interval_count: number): number {
    const currentDate = new Date();
    let nextBillingDate: Date;

    switch (interval) {
      case 'day':
        nextBillingDate = new Date(currentDate.setDate(currentDate.getDate() + interval_count));
        break;
      case 'week':
        nextBillingDate = new Date(currentDate.setDate(currentDate.getDate() + interval_count * 7));
        break;
      case 'month':
        nextBillingDate = new Date(currentDate.setMonth(currentDate.getMonth() + interval_count));
        break;
      case 'year':
        nextBillingDate = new Date(currentDate.setFullYear(currentDate.getFullYear() + interval_count));
        break;
      default:
        throw new Error('Invalid interval');
    }

    return Math.floor(nextBillingDate.getTime() / 1000);
  }

  async createSubscription(
    customerId: string,
    priceId: string,
    quantity: number,
    companyId: string,
    description?: string
  ) {
    try {
      const price = await this.stripe.prices.retrieve(priceId);
      const interval = price.recurring?.interval;
      const interval_count = price.recurring?.interval_count || 1;

      if (!interval) {
        throw new Error('Invalid price interval');
      }

      const nextBillingDate = this.getNextBillingDate(interval, interval_count);

      const subscription = await this.stripe.subscriptions.create({
        customer: customerId,
        items: [
          {
            price: priceId,
            quantity
          }
        ],
        metadata: {
          companyId: companyId
        },
        payment_behavior: 'allow_incomplete',
        proration_behavior: 'none',
        expand: ['latest_invoice'],
        description,
        collection_method: 'charge_automatically',
        billing_cycle_anchor: nextBillingDate
      });

      return subscription;
    } catch (error) {
      console.error('Error creating subscription', { error, customerId, priceId, companyId });
      throw this.handleStripeError(error);
    }
  }

  async updateSubscriptionQuantity(subscriptionId: string, priceId: string, newQuantity: number, description?: string) {
    try {
      const subscription = await this.stripe.subscriptions.retrieve(subscriptionId);

      const item = subscription.items.data.find((item: any) => item.price.id === priceId);

      if (!item) {
        throw new Error('Price ID not found in the subscription');
      }

      const updatedSubscription = await this.stripe.subscriptions.update(subscriptionId, {
        items: [
          {
            id: item.id,
            quantity: newQuantity
          }
        ],
        description,
        proration_behavior: 'none'
      });

      return updatedSubscription;
    } catch (error) {
      console.error('Error updating subscription quantity', { error, subscriptionId, priceId, newQuantity });
      throw this.handleStripeError(error);
    }
  }

  async createInvoice(
    customerId: string,
    lineItems: StripeLineItem[],
    companyId: string,
    shouldAutoAdvance: boolean = false,
    invoiceCouponId?: string,
    description?: string
  ) {
    try {
      let discounts: {coupon: string}[] = [];
      if (invoiceCouponId) {
        const coupon = await this.stripe.coupons.retrieve(invoiceCouponId);
        if (coupon.valid && (!coupon.redeem_by || coupon.redeem_by >= Math.floor(Date.now() / 1000))) {
          discounts = [{ coupon: invoiceCouponId }] 
        } else {
          console.warn(`Coupon ${invoiceCouponId} is invalid or expired.`);
        }
      }
  
      const invoice = await this.stripe.invoices.create({
        customer: customerId,
        auto_advance: shouldAutoAdvance,
        metadata: {
          companyId: companyId
        },
        discounts,
        description
      });
  
      for (const item of lineItems) {
        const invoiceItemData: Stripe.InvoiceItemCreateParams = {
          customer: customerId,
          invoice: invoice.id,
          discountable: true,
          quantity: item.quantity,
          description: item.description,
          discounts: []
        };
  
        if (item.couponId) {
          const itemCoupon = await this.stripe.coupons.retrieve(item.couponId);
          if (itemCoupon.valid && (!itemCoupon.redeem_by || itemCoupon.redeem_by >= Math.floor(Date.now() / 1000))) {
            invoiceItemData.discounts =  [{ coupon: item.couponId }] 
          } else {
            console.warn(`Coupon ${item.couponId} for item is invalid or expired.`);
          }
        }
  
        if (item.amount) {
          invoiceItemData.price_data = { product: item.productId, unit_amount: item.amount, currency: 'usd' };
        } else if (item.priceId) {
          invoiceItemData.price = item.priceId;
        }
  
        await this.stripe.invoiceItems.create(invoiceItemData);
      }
  
      return invoice;
    } catch (error) {
      console.log(error);
      throw this.handleStripeError(error);
    }
  }

  async createCompleteInvoice(
    customerId: string,
    companyId: string,
    shouldAutoAdvance: boolean = false,
    startDate?: Date,
    endDate?: Date
  ) {
    try {
      const previousInvoices = await this.searchInvoicesForCompany(customerId, true, true, startDate, endDate);
      if (previousInvoices.length === 0) {
        throw new Error('There are no invoices to combine together.');
      }
      const invoiceDetails = previousInvoices.map((invoice) => {
        return {
          amount: invoice.amount_due,
          description: `Summary of Invoice ${invoice.id}`
        };
      });
      const startDateStr = startDate ? startDate.toISOString().split('T')[0] : 'beginning';
      const endDateStr = endDate ? endDate.toISOString().split('T')[0] : 'now';
      const invoiceDescription = `Complete invoice from ${startDateStr} to ${endDateStr}`;

      const newInvoice = await this.stripe.invoices.create({
        customer: customerId,
        metadata: {
          companyId: companyId,
          combined: 'true'
        },
        description: invoiceDescription,
        auto_advance: shouldAutoAdvance
      });

      for (const detail of invoiceDetails) {
        await this.stripe.invoiceItems.create({
          customer: customerId,
          amount: detail.amount,
          invoice: newInvoice.id,
          currency: 'usd',
          description: detail.description
        });
      }

      for (const invoice of previousInvoices) {
        if (invoice.status === 'draft') {
          await this.stripe.invoices.finalizeInvoice(invoice.id);
        }
        if (invoice.amount_due === 0) {
          continue;
        }
        await this.stripe.invoices.voidInvoice(invoice.id);
      }

      return {newInvoice, previousInvoices};
    } catch (error) {
      console.error('Error creating complete invoice', { error, customerId, companyId });
      throw this.handleStripeError(error);
    }
  }

  async createPriceForCompany(productId: string, companyId: string, amount: number, currency: string = 'usd') {
    try {
      const prices = await this.stripe.prices.search({
        query: `metadata['companyId']:'${companyId}' AND active:'true' AND product:'${productId}'`
      });

      for (const price of prices.data) {
        await this.stripe.prices.update(price.id, {
          active: false,
          metadata: {
            ...price.metadata
          }
        });
      }

      const newPrice = await this.stripe.prices.create({
        product: productId,
        unit_amount: amount,
        currency: currency,
        metadata: {
          companyId: companyId
        }
      });

      return newPrice;
    } catch (error) {
      throw this.handleStripeError(error);
    }
  }

  async searchInvoicesForCompany(
    customerId: string,
    isUnpaid: boolean = false,
    removeCombined: boolean = false,
    startDate?: Date,
    endDate?: Date
  ) {
    try {
      const startTimestamp = startDate ? Math.floor(startDate.getTime() / 1000) : 0;
      const endTimestamp = endDate ? Math.floor(endDate.getTime() / 1000) : Math.floor(Date.now() / 1000);

      let allInvoices: Stripe.Invoice[] = [];
      let hasMore = true;
      let page: string | null = null;

      while (hasMore) {
        const queryParts = [`customer:'${customerId}'`];
        if (isUnpaid) {
          queryParts.push(`-status:'void'`);
          queryParts.push(`-status:'paid'`);
          queryParts.push(`-status:'deleted'`);
        }
        if (removeCombined) {
          queryParts.push(`-metadata['combined']:'true'`);
        }

        if (startDate) {
          queryParts.push(`created>=${startTimestamp}`);
        }
        if (endDate) {
          queryParts.push(`created<=${endTimestamp}`);
        }
        const query = queryParts.join(' AND ');

        const invoices = await this.stripe.invoices.search({
          query: query,
          limit: 100,
          page: page ?? undefined
        });

        allInvoices = allInvoices.concat(invoices.data);
        hasMore = invoices.has_more;
        page = invoices.next_page;
      }

      return allInvoices;
    } catch (error) {
      throw this.handleStripeError(error);
    }
  }

  async getSubscriptionById(subscriptionId: string) {
    try {
      const subscription = await this.stripe.subscriptions.retrieve(subscriptionId);
      return subscription;
    } catch (error) {
      throw this.handleStripeError(error);
    }
  }

  async createBankAccountSetupSession(customerId: string, successUrl: string, cancelUrl: string) {
    try {
      const checkoutSession = await this.stripe.checkout.sessions.create({
        mode: 'setup',
        customer: customerId,
        payment_method_types: ['card', 'us_bank_account'],
        payment_method_options: {
          us_bank_account: {
            financial_connections: { permissions: ['payment_method'] }
          }
        },
        success_url: successUrl,
        cancel_url: cancelUrl
      });

      return checkoutSession;
    } catch (error) {
      console.log(error);
      throw new Error('Failed to create bank account setup session');
    }
  }

  async createCoupon(
    companyId: string,
    productType?: StripeProductType,
    flag?: string,
    amountOff?: number,
    percentOff?: number,
    maxRedemptions?: number,
    redeemBy?: Date,
    name?: string,
  ): Promise<Stripe.Coupon> {
    try {
      const coupon = await this.stripe.coupons.create( {
        amount_off: amountOff,
        percent_off: percentOff,
        max_redemptions: maxRedemptions,
        redeem_by: redeemBy ? Math.floor(redeemBy.getTime() / 1000) : undefined,
        name,
        currency: 'usd',
        duration: "forever",
        metadata: {
          productType : String(productType),
          companyId: companyId,
          flag: String(flag)
        }
      });

      return coupon;
    } catch (error) {
      console.error('Error creating coupon', { error, amountOff, percentOff });
      throw this.handleStripeError(error);
    }
  }


  private handleStripeError(error: any) {
    return new Error(`An error occurred while processing your request. ${error}`);
  }
}
