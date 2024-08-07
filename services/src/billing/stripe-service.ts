import { StripeLineItem, StripeProductType } from '@hike/types';
import dayjs from 'dayjs';
import Stripe from 'stripe';

export class StripeService {
  private stripe: Stripe;

  constructor(apiKey: string) {
    this.stripe = new Stripe(apiKey, {
      apiVersion: '2024-06-20'
    });
  }

  getNextBillingDate(interval: Stripe.Price.Recurring.Interval, increment: number = 1): number {
    const currentDate = dayjs();
    let nextBillingDate: dayjs.Dayjs;

    switch (interval) {
      case 'day':
        nextBillingDate = currentDate.add(increment, 'day');
        break;
      case 'week':
        nextBillingDate = currentDate.add(increment, 'week');
        break;
      case 'month':
        nextBillingDate = currentDate.add(increment, 'month');
        break;
      case 'year':
        nextBillingDate = currentDate.add(increment, 'year');
        break;
      default:
        throw new Error('Invalid interval');
    }

    return nextBillingDate.unix();
  }

  async createSubscription(
    customerId: string,
    priceId: string,
    quantity: number,
    companyId: string,
    description?: string
  ) {
    try {
      const price: Stripe.Price = await this.stripe.prices.retrieve(priceId);
      const interval = price.recurring?.interval;
      const increment = price.recurring?.interval_count;

      if (!interval) {
        throw new Error('Invalid price interval');
      }

      const nextBillingDate = this.getNextBillingDate(interval, increment);

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

  async getCouponValidation(couponId: string) {
    let discounts: { coupon: string }[] = [];
    const coupon = await this.stripe.coupons.retrieve(couponId);
    if (coupon.valid && (!coupon.redeem_by || dayjs.unix(coupon.redeem_by).isAfter(dayjs()))) {
      discounts = [{ coupon: couponId }];
    } else {
      console.warn(`Coupon ${couponId} is invalid or expired.`);
    }
    return discounts;
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
      let discounts: { coupon: string }[] = invoiceCouponId ? await this.getCouponValidation(invoiceCouponId) : [];

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

        invoiceItemData.discounts = item.couponId ? await this.getCouponValidation(item.couponId) : [];

        //If an amount is given, then use that amount with the productId, if not then use the given Price (used for orthofeet)
        if (item.amount) {
          invoiceItemData.price_data = { product: item.productId, unit_amount: item.amount, currency: 'usd' };
        } else if (item.priceId) {
          invoiceItemData.price = item.priceId;
        }

        await this.stripe.invoiceItems.create(invoiceItemData);
      }
      return await this.stripe.invoices.retrieve(invoice.id);
    } catch (error) {
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
          id: invoice.id,
          status: invoice.status,
          amount: invoice.amount_due,
          description: `Summary of Invoice ${invoice.id}`
        };
      });

      const startDateStr = startDate ? dayjs(startDate).format('YYYY-MM-DD') : 'beginning';
      const endDateStr = endDate ? dayjs(endDate).format('YYYY-MM-DD') : 'now';
      const invoiceDescription = `Complete invoice from ${startDateStr} to ${endDateStr}`;

      const combinedInvoice = await this.stripe.invoices.create({
        customer: customerId,
        metadata: {
          companyId: companyId,
          combined: 'true'
        },
        description: invoiceDescription,
        auto_advance: shouldAutoAdvance
      });

      for (const invoice of invoiceDetails) {
        let item: Stripe.InvoiceItem | null = null;
        try {
          item = await this.stripe.invoiceItems.create({
            customer: customerId,
            amount: invoice.amount,
            invoice: combinedInvoice.id,
            currency: 'usd',
            description: invoice.description
          });

          if (invoice.status === 'draft') {
            await this.stripe.invoices.finalizeInvoice(invoice.id);
          }
          if (invoice.amount === 0) {
            continue;
          }
          await this.stripe.invoices.voidInvoice(invoice.id);
        } catch (error) {
          if (item) {
            await this.stripe.invoiceItems.del(item.id);
          }

          throw this.handleStripeError(error);
        }
      }
      const newInvoice = await this.stripe.invoices.retrieve(combinedInvoice.id);

      return { newInvoice, previousInvoices };
    } catch (error) {
      console.error('Error creating complete invoice', { error, customerId, companyId });
      throw this.handleStripeError(error);
    }
  }

  async createPriceForCompany(productId: string, companyId: string, amount: number, currency: string = 'usd') {
    try {
      const query = [`metadata['companyId']:'${companyId}'`, `product:'${productId}'`, `active:'true'`].join(' AND ');

      const prices = await this.stripe.prices.search({ query });

      for (const price of prices.data) {
        await this.stripe.prices.update(price.id, {
          active: false,
          metadata: price.metadata
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
      let allInvoices: Stripe.Invoice[] = [];
      let hasMore = true;
      let page: string | null = null;

      const threeMonthsAgo = dayjs().subtract(3, 'months').startOf('day');

      const startTimestamp = startDate ? dayjs(startDate).startOf('day').unix() : threeMonthsAgo.unix();

      const endTimestamp = endDate ? dayjs(endDate).endOf('day').unix() : dayjs().endOf('day').unix();

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

  async getInvoiceById(invoiceId: string) {
    try {
      const invoice = await this.stripe.invoices.retrieve(invoiceId);
      return invoice;
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
      throw this.handleStripeError(error);
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
    name?: string
  ): Promise<Stripe.Coupon> {
    try {
      const coupon = await this.stripe.coupons.create({
        amount_off: amountOff,
        percent_off: percentOff,
        max_redemptions: maxRedemptions,
        redeem_by: redeemBy ? Math.floor(redeemBy.getTime() / 1000) : undefined,
        name,
        currency: 'usd',
        duration: 'forever',
        metadata: {
          productType: String(productType),
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
