import Stripe from 'stripe';

export interface StripeLineItem {
  priceId: string;
  quantity: number;
  couponId?: string;
}

export class StripeService {
  private stripe: Stripe;

  constructor(apiKey: string) {
    this.stripe = new Stripe(apiKey, {
      apiVersion: '2024-06-20'
    });
  }

  async createInvoice(customerId: string, lineItems: StripeLineItem[]) {
    try {
      const invoice = await this.stripe.invoices.create({
        customer: customerId,
        collection_method: 'charge_automatically',
        auto_advance: true
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
      //TODO: Update metadata based on companyInfo
      const price = await this.stripe.prices.create({
        product: productId,
        unit_amount: amount,
        currency: currency,
        metadata: {
          companyId: companyId
        }
      });

      return price;
    } catch (error) {
      throw this.handleStripeError(error);
    }
  }

  async searchInvoicesForCompany(companyId: string, startDate: Date, endDate: Date) {
    try {
      const startTimestamp = Math.floor(startDate.getTime() / 1000);
      const endTimestamp = Math.floor(endDate.getTime() / 1000);

      let allInvoices: Stripe.Invoice[] = [];
      let hasMore = true;
      let page: string | null = null;
      while (hasMore) {
        const invoices = await this.stripe.invoices.search({
          query: `metadata['companyId']:'${companyId}' AND created>=${startTimestamp} AND created<=${endTimestamp}`,
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

  private handleStripeError(error: any) {
    console.error('Stripe error:', error);
    return new Error('An error occurred while processing your request');
  }
}
