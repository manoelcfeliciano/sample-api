import { LogAnalyticsPurchase } from '~/data/protocols/analytics/log-analytics-purchase';
import { PaymentConfirmPurchase } from '~/domain/use-cases/payment/confirm-purchase';

export class RemotePaymentConfirmPurchase implements PaymentConfirmPurchase {
	constructor(private readonly analytics: LogAnalyticsPurchase) {}

	confirm = async (params: PaymentConfirmPurchase.Params): Promise<void> => {
		await this.analytics.log({
			payload: {
				payment: {
					currency: params.payment.currency,
					price: params.payment.price,
					tax: 0,
				},
			},
			user: params.user,
		});
	};
}
