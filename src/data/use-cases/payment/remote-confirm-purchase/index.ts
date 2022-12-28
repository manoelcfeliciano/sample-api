import { LogAnalyticsPurchase } from '~/data/protocols/analytics/log-analytics-purchase';
import { PaymentConfirmPurchase } from '~/domain/use-cases/payment/confirm-purchase';

export class RemotePaymentConfirmPurchase implements PaymentConfirmPurchase {
	constructor(private readonly analytics: LogAnalyticsPurchase) {}

	confirm = async (params: PaymentConfirmPurchase.Params): Promise<void> => {
		// Write logic to mark as purchased here

		await this.analytics.log({
			payload: {
				payment: {
					currency: params.payment.currency,
					price: params.payment.price,
				},
			},
			user: params.user,
		});
	};
}
