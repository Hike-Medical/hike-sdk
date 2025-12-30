import { isDefined, StripeLineItem, StripeProductType } from '@hike/sdk';
import dayjs from 'dayjs';
import Stripe from 'stripe';

export class StripeService {
  private stripe: Stripe;

  constructor(apiKey: string) {
    this.stripe = new Stripe(apiKey, {
      apiVersion: '2024-06-20'
    });
  }

  getNextBillingDate(interval: Stripe.Price.Recurring.Interval, increment = 1): number {
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

  async createPaymentIntent(
    amount: number,
    currency = 'usd',
    metadata?: Stripe.MetadataParam,
    captureMethod?: Stripe.PaymentIntent.CaptureMethod
  ): Promise<Stripe.PaymentIntent> {
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount,
        currency,
        metadata,
        automatic_payment_methods: { enabled: true },
        capture_method: captureMethod
      });
      return paymentIntent;
    } catch (error) {
      throw this.handleStripeError(error);
    }
  }

  async capturePaymentIntent(paymentIntentId: string): Promise<Stripe.PaymentIntent> {
    try {
      const paymentIntent = await this.stripe.paymentIntents.capture(paymentIntentId);
      return paymentIntent;
    } catch (error) {
      throw this.handleStripeError(error);
    }
  }

  async cancelPaymentIntent(paymentIntentId: string): Promise<Stripe.PaymentIntent> {
    try {
      const paymentIntent = await this.stripe.paymentIntents.cancel(paymentIntentId);
      return paymentIntent;
    } catch (error) {
      throw this.handleStripeError(error);
    }
  }

  async createSetupIntent(
    customerId: string,
    stripeEntityId: string,
    usage: 'off_session' | 'on_session' = 'off_session'
  ): Promise<Stripe.SetupIntent> {
    try {
      return await this.stripe.setupIntents.create({
        customer: customerId,
        usage,
        payment_method_types: ['card', 'us_bank_account'],
        metadata: {
          reason: 'Saving card on file',
          stripeEntityId
        }
      });
    } catch (error) {
      throw this.handleStripeError(error);
    }
  }

  async updateCustomer(customerId: string, data: Stripe.CustomerUpdateParams): Promise<Stripe.Customer> {
    try {
      return await this.stripe.customers.update(customerId, data);
    } catch (error) {
      throw this.handleStripeError(error);
    }
  }

  async getFinalPrice(
    couponIds: string[],
    priceId?: string,
    amount?: number
  ): Promise<{ original: number; discounted: number }> {
    const bestCoupon = await this.validateAndFindBestCoupon(couponIds);
    const couponId = bestCoupon[0]?.coupon;

    const coupon = couponId ? await this.stripe.coupons.retrieve(couponId) : null;

    const price = priceId ? await this.stripe.prices.retrieve(priceId) : null;
    const originalPrice = amount || price?.unit_amount || 0;
    let finalPrice = originalPrice;

    if (coupon) {
      if (coupon.percent_off) {
        finalPrice -= finalPrice * (coupon.percent_off / 100);
      }
      if (coupon.amount_off) {
        finalPrice -= coupon.amount_off;
      }
    }

    return { original: originalPrice, discounted: Math.max(0, finalPrice) };
  }

  async addCreditToCustomerBalance(customerId: string, addBalance: number): Promise<Stripe.Customer> {
    const customer = await this.stripe.customers.retrieve(customerId);

    if (customer.deleted) {
      throw new Error('Cannot add credit to deleted customer');
    }

    const currentBalance = typeof customer.balance === 'number' ? customer.balance : 0;

    const newBalance = currentBalance + addBalance;

    return await this.stripe.customers.update(customerId, {
      balance: newBalance
    });
  }

  async createSubscription(
    customerId: string,
    priceId: string,
    quantity: number,
    companyId: string,
    description?: string
  ): Promise<Stripe.Subscription> {
    try {
      const price: Stripe.Price = await this.stripe.prices.retrieve(priceId);
      const interval = price.recurring?.interval;

      if (!interval) {
        throw new Error('Invalid price interval');
      }

      const nextBillingDate = this.getNextBillingDate(interval);

      const subscription = await this.stripe.subscriptions.create({
        customer: customerId,
        items: [
          {
            price: priceId,
            quantity
          }
        ],
        metadata: {
          companyId
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

  async createStripeCustomer(name?: string, email?: string, metadata?: Record<string, any>): Promise<Stripe.Customer> {
    try {
      return await this.stripe.customers.create({
        name,
        email,
        metadata
      });
    } catch (error) {
      console.error('Error creating Stripe Customer:', error);
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

  async getCouponById(couponId): Promise<Stripe.Coupon> {
    return await this.stripe.coupons.retrieve(couponId);
  }

  async getValidCoupons(couponIds: string[]): Promise<Stripe.Coupon[]> {
    const coupons = await Promise.all(
      couponIds.map(async (couponId) => {
        try {
          const coupon = await this.getCouponById(couponId);
          return this.isCouponValid(coupon) ? coupon : null;
        } catch (error) {
          console.error(`Error retrieving coupon ${couponId}:`, error);
          return null;
        }
      })
    );

    return coupons.filter(isDefined);
  }

  private isCouponValid(coupon: Stripe.Coupon): boolean {
    return coupon.valid && (!coupon.redeem_by || dayjs.unix(coupon.redeem_by).isAfter(dayjs()));
  }

  findBestCoupon(discounts: Stripe.Coupon[]): string | null {
    let bestPercentOff: Stripe.Coupon | null = null;
    let bestAmountOff: Stripe.Coupon | null = null;

    for (const discount of discounts) {
      if (discount.percent_off) {
        if (!bestPercentOff || discount.percent_off > bestPercentOff.percent_off!) {
          bestPercentOff = discount;
        } else if (discount.percent_off === bestPercentOff.percent_off) {
          if (
            bestPercentOff.max_redemptions &&
            (!discount.max_redemptions ||
              discount.max_redemptions - discount.times_redeemed >
                bestPercentOff.max_redemptions - bestPercentOff.times_redeemed)
          ) {
            bestPercentOff = discount;
          }
        }
      } else if (discount.amount_off) {
        if (!bestAmountOff || discount.amount_off > bestAmountOff.amount_off!) {
          bestAmountOff = discount;
        } else if (discount.amount_off === bestAmountOff.amount_off) {
          if (
            bestAmountOff.max_redemptions &&
            (!discount.max_redemptions ||
              discount.max_redemptions - discount.times_redeemed >
                bestAmountOff.max_redemptions - bestAmountOff.times_redeemed)
          ) {
            bestAmountOff = discount;
          }
        }
      }
    }

    return (bestPercentOff?.id || bestAmountOff?.id) ?? null;
  }

  async validateAndFindBestCoupon(couponIds: string[]) {
    const validDiscounts = await this.getValidCoupons(couponIds);
    const bestCoupon = this.findBestCoupon(validDiscounts);
    return bestCoupon ? [{ coupon: bestCoupon }] : [];
  }

  async createInvoice(
    customerId: string,
    lineItems: StripeLineItem[],
    companyId: string,
    shouldAutoAdvance = false,
    sendInvoice = false,
    invoiceCouponIds?: string[],
    description?: string,
    subscriptionId?: string,
    overrideItemExists?: boolean
  ) {
    try {
      const discounts: { coupon: string }[] = invoiceCouponIds
        ? await this.validateAndFindBestCoupon(invoiceCouponIds)
        : [];

      const invoice = await this.stripe.invoices.create({
        customer: customerId,
        auto_advance: shouldAutoAdvance,
        metadata: {
          companyId,
          ...(subscriptionId && { subscriptionId })
        },
        discounts,
        description,
        collection_method: sendInvoice ? 'send_invoice' : 'charge_automatically',
        days_until_due: sendInvoice ? 30 : undefined
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

        invoiceItemData.discounts = item.couponIds ? await this.validateAndFindBestCoupon(item.couponIds) : [];

        // If an amount is given, then use that amount with the productId, if not then use the given Price (used for orthofeet)
        if (item.amount) {
          invoiceItemData.price_data = { product: item.productId, unit_amount: item.amount, currency: 'usd' };
        } else if (item.priceId) {
          invoiceItemData.price = item.priceId;
        }

        await this.stripe.invoiceItems.create(invoiceItemData);
      }
      const totalInvoice = await this.stripe.invoices.retrieve(invoice.id, {
        expand: ['discounts', 'lines.data.discounts']
      });

      if (subscriptionId) {
        const upcomingInvoice = await this.stripe.invoices.retrieveUpcoming({
          customer: customerId,
          subscription: subscriptionId
        });

        let itemExists = false;

        if (overrideItemExists !== undefined) {
          itemExists = overrideItemExists;
        } else {
          for (const lineItem of upcomingInvoice.lines.data) {
            if (Number(lineItem.unit_amount_excluding_tax) === totalInvoice.amount_due) {
              const itemId = lineItem.invoice_item?.toString();
              if (itemId && lineItem.quantity) {
                await this.stripe.invoiceItems.update(itemId, {
                  quantity: lineItem.quantity + 1
                });
                itemExists = true;
              }
              break;
            }
          }
        }

        if (!itemExists) {
          await this.stripe.invoiceItems.create({
            customer: customerId,
            subscription: subscriptionId,
            unit_amount: totalInvoice.amount_due,
            quantity: 1,
            currency: 'usd',
            description: overrideItemExists !== undefined ? (description ?? 'Hike Invoice Item') : 'Custom Hike Insole'
          });
        }

        await this.stripe.invoices.finalizeInvoice(totalInvoice.id);
        if (totalInvoice.amount_due !== 0) {
          await this.stripe.invoices.markUncollectible(invoice.id);
        }
      }

      return totalInvoice;
    } catch (error) {
      throw this.handleStripeError(error);
    }
  }

  async createCompleteInvoice(
    customerId: string,
    companyId: string,
    shouldAutoAdvance = false,
    startDate?: Date,
    endDate?: Date
  ) {
    try {
      const previousInvoices = await this.searchInvoicesForCompany(customerId, true, true, startDate, endDate);
      if (previousInvoices.length === 0) {
        throw new Error('There are no invoices to combine together.');
      }
      const invoiceDetails = previousInvoices.map((invoice) => ({
        id: invoice.id,
        status: invoice.status,
        amount: invoice.amount_due,
        description: `Summary of Invoice ${invoice.id}`
      }));

      const startDateStr = startDate ? dayjs(startDate).format('YYYY-MM-DD') : 'beginning';
      const endDateStr = endDate ? dayjs(endDate).format('YYYY-MM-DD') : 'now';
      const invoiceDescription = `Complete invoice from ${startDateStr} to ${endDateStr}`;

      const combinedInvoice = await this.stripe.invoices.create({
        customer: customerId,
        metadata: {
          companyId,
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
            // eslint-disable-next-line no-continue
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

  async createPriceForCompany(productId: string, companyId: string, amount: number, currency = 'usd') {
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
        currency,
        metadata: {
          companyId
        }
      });

      return newPrice;
    } catch (error) {
      throw this.handleStripeError(error);
    }
  }

  async searchInvoicesForCompany(
    customerId: string,
    isUnpaid = false,
    removeCombined = false,
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
          query,
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

  async getSubscriptionInvoices(subscriptionId: string): Promise<Stripe.Invoice[]> {
    try {
      const invoices = await this.stripe.invoices.list({
        subscription: subscriptionId,
        limit: 100
      });

      return invoices.data;
    } catch (error) {
      console.error('Error fetching subscription invoices', { error, subscriptionId });
      throw this.handleStripeError(error);
    }
  }

  async cancelInvoiceById(invoiceId: string) {
    try {
      const invoice = await this.getInvoiceById(invoiceId);
      if (invoice.status === 'draft') {
        await this.stripe.invoices.del(invoice.id);
      } else if (invoice.status === 'open' || invoice.status === 'uncollectible') {
        await this.stripe.invoices.voidInvoice(invoice.id);
      }
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
          companyId,
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

  async updateInvoice(invoiceId: string, updateParams: Stripe.InvoiceUpdateParams): Promise<Stripe.Invoice> {
    try {
      const updatedInvoice = await this.stripe.invoices.update(invoiceId, updateParams);
      return updatedInvoice;
    } catch (error) {
      console.error('Error updating invoice', { error, invoiceId, updateParams });
      throw this.handleStripeError(error);
    }
  }

  async updateSubscription(
    subscriptionId: string,
    updateParams: Stripe.SubscriptionUpdateParams
  ): Promise<Stripe.Subscription> {
    try {
      const updatedSubscription = await this.stripe.subscriptions.update(subscriptionId, updateParams);
      return updatedSubscription;
    } catch (error) {
      console.error('Error updating subscription', { error, subscriptionId, updateParams });
      throw this.handleStripeError(error);
    }
  }

  async cancelSubscription(subscriptionId: string): Promise<Stripe.Subscription> {
    try {
      const cancelledSubscription = await this.stripe.subscriptions.cancel(subscriptionId, {
        invoice_now: true
      });

      return cancelledSubscription;
    } catch (error) {
      console.error('Error cancelleding subscription', { error, subscriptionId });
      throw this.handleStripeError(error);
    }
  }

  async createCheckoutSession(
    lineItems: StripeLineItem[],
    companyId: string,
    successUrl: string,
    cancelUrl: string,
    couponIds: string[],
    externalId?: string,
    productId?: string
  ): Promise<Stripe.Checkout.Session> {
    try {
      const sessionParams: Stripe.Checkout.SessionCreateParams = {
        payment_method_types: ['card', 'us_bank_account'],
        mode: 'payment',
        client_reference_id: externalId,
        success_url: successUrl,
        cancel_url: cancelUrl,
        line_items: lineItems.map((item) => {
          const lineItem: Stripe.Checkout.SessionCreateParams.LineItem = {
            quantity: item.quantity,
            adjustable_quantity: { enabled: false }
          };

          if (item.priceId) {
            lineItem.price = item.priceId;
          } else {
            lineItem.price_data = {
              currency: 'usd',
              product_data: {
                name: item.description || 'Product',
                description: item.description,
                metadata: {
                  productId: item.productId
                }
              },
              unit_amount: item.amount || 0
            };
          }

          return lineItem;
        }),
        customer_creation: 'always',
        metadata: {
          companyId,
          ...(externalId && { externalId }),
          ...(productId && { productId })
        },
        invoice_creation: {
          enabled: true,
          invoice_data: {
            description: `Checkout session invoice: ${externalId}`,
            metadata: {
              companyId,
              ...(externalId && { externalId }),
              ...(productId && { productId })
            }
          }
        }
      };

      if (couponIds) {
        sessionParams.discounts = await this.validateAndFindBestCoupon(couponIds);
      }

      const session = await this.stripe.checkout.sessions.create(sessionParams);
      return session;
    } catch (error) {
      console.error('Error creating checkout session', { error, lineItems, companyId });
      throw this.handleStripeError(error);
    }
  }
}
