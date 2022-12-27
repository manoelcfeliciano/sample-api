import { LogAnalyticsPurchase } from '~/data/protocols/analytics/log-analytics-purchase';
import { IntercomAnalytics } from '../../protocols/intercom';

export class IntercomLogPurchase implements LogAnalyticsPurchase {
	private readonly eventName = 'made purchase';

	constructor(private readonly intercom: IntercomAnalytics) {}

	log = (params: LogAnalyticsPurchase.Params) => {
		return this.intercom.report(this.eventName, {
			user: params.user,
			metadata: {
				affiliation: 'web_checkout',
				item_category: 'purchase',
				item_variant: 'default',
				promotion_id: params.payload.campaign?.id ?? '',
				promotion_name: params.payload.campaign?.name ?? '',
				price: {
					amount: params.payload.payment.price * 100,
					currency: params.payload.payment.currency,
				},
			},
		});
	};
}
