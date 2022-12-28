import { LogAnalyticsPurchase } from '~/data/protocols/analytics/log-analytics-purchase';
import { PaymentConfirmPurchase } from '~/domain/use-cases/payment/confirm-purchase';

export class RemotePaymentConfirmPurchase implements PaymentConfirmPurchase {
	constructor(private readonly analytics: LogAnalyticsPurchase) {}

	confirm = async (params: PaymentConfirmPurchase.Params): Promise<void> => {
		// Logic to mark as purchased should go here

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
