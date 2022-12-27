import { LogAnalyticsPurchase } from '~/data/protocols/analytics/log-analytics-purchase';
import { LogAnalyticsComposite } from '~/data/use-cases/analytics/composite';
import { IntercomLogPurchase } from '~/infra/analytics/intercom/use-cases/log-purchase';
import { makeIntercomAnalyticsProvider } from '~/main/factories/infra/analytics/intercom/provider-factory';

const makeLogPurchaseProvider = {
	intercom: () => {
		const intercom = makeIntercomAnalyticsProvider();
		return new IntercomLogPurchase(intercom);
	},
};

export const makeLogAnalyticsConfirmPurchase = (): LogAnalyticsPurchase => {
	const intercom = makeLogPurchaseProvider.intercom();

	return new LogAnalyticsComposite([intercom]);
};
