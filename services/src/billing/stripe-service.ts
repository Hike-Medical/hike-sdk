import { StripeLineItem } from '@hike/types';
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

  async createSubscription(customerId: string, priceId: string, companyId: string, facilityIds: string[]) {
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
        items: facilityIds.map((facilityId) => ({
          price: priceId,
          metadata: {
            facilityId: facilityId
          }
        })),
        metadata: {
          companyId: companyId
        },
        payment_behavior: 'allow_incomplete',
        proration_behavior: 'none',
        expand: ['latest_invoice'],
        collection_method: 'charge_automatically',
        billing_cycle_anchor: nextBillingDate
      });

      return subscription;
    } catch (error) {
      console.error('Error creating subscription', { error, customerId, priceId, companyId, facilityIds });
      throw this.handleStripeError(error);
    }
  }

  async addFacilitiesToSubscription(subscriptionId: string, priceId: string, newFacilityIds: string[]) {
    try {
      const subscription = await this.stripe.subscriptions.retrieve(subscriptionId);

      const newItems = newFacilityIds.map((facilityId) => ({
        price: priceId,
        metadata: {
          facilityId: facilityId
        }
      }));

      const updatedSubscription = await this.stripe.subscriptions.update(subscriptionId, {
        items: [
          ...subscription.items.data.map((item) => ({
            id: item.id,
            price: item.price.id,
            quantity: item.quantity
          })),
          ...newItems
        ]
      });

      return updatedSubscription;
    } catch (error) {
      console.error('Error updating subscription', { error, subscriptionId, priceId, newFacilityIds });
      throw this.handleStripeError(error);
    }
  }

  async deleteFacilitiesFromSubscription(subscriptionId: string, facilityIdsToDelete: string[]) {
    try {
      const subscription = await this.stripe.subscriptions.retrieve(subscriptionId);

      const remainingItems = subscription.items.data
        .filter((item) => {
          const facilityId = item.metadata.facilityId;
          return !facilityIdsToDelete.includes(facilityId ?? '');
        })
        .map((item) => ({
          id: item.id,
          price: item.price.id,
          quantity: item.quantity
        }));

      const updatedSubscription = await this.stripe.subscriptions.update(subscriptionId, {
        items: remainingItems
      });

      return updatedSubscription;
    } catch (error) {
      console.error('Error deleting facilities from subscription', { error, subscriptionId, facilityIdsToDelete });
      throw this.handleStripeError(error);
    }
  }

  async createInvoice(customerId: string, lineItems: StripeLineItem[], companyId: string, invoiceCouponId?: string) {
    try {
      const invoice = await this.stripe.invoices.create({
        customer: customerId,
        collection_method: 'charge_automatically',
        auto_advance: true,
        metadata: {
          companyId: companyId
        },
        discounts: invoiceCouponId ? [{ coupon: invoiceCouponId }] : []
      });

      //TODO: Add coupons
      for (const item of lineItems) {
        await this.stripe.invoiceItems.create({
          customer: customerId,
          price: item.priceId,
          invoice: invoice.id,
          discountable: true,
          quantity: item.quantity,
          discounts: item.couponId ? [{ coupon: item.couponId }] : []
        });
      }

      const finalizedInvoice = await this.stripe.invoices.finalizeInvoice(invoice.id);

      return finalizedInvoice;
    } catch (error) {
      throw this.handleStripeError(error);
    }
  }

  async createPriceForCompany(productId: string, companyId: string, amount: number, currency: string = 'usd') {
    try {
      const existingPrices = await this.stripe.prices.search({
        query: `product:'${productId}' AND metadata['companyId']:'${companyId}' AND active:'true'`,
        limit: 1
      });

      if (existingPrices.data.length > 0) {
        const existingPrice = existingPrices.data[0];
        throw new Error(
          `A price of ${existingPrice?.unit_amount ?? 0 / 100} ${existingPrice?.currency.toUpperCase()} already exists for this product and company.`
        );
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

  async searchInvoicesForCompany(companyId: string, startDate?: Date, endDate?: Date) {
    try {
      const startTimestamp = startDate ? Math.floor(startDate.getTime() / 1000) : 0;
      const endTimestamp = endDate ? Math.floor(endDate.getTime() / 1000) : Math.floor(Date.now() / 1000);

      let allInvoices: Stripe.Invoice[] = [];
      let hasMore = true;
      let page: string | null = null;

      while (hasMore) {
        const queryParts = [`metadata['companyId']:'${companyId}'`];
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

  private handleStripeError(error: any) {
    return new Error(`An error occurred while processing your request. ${error}`);
  }
}
