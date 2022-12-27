import { IntercomAnalytics } from '~/infra/analytics/intercom/protocols/intercom';
import { IntercomAnalyticsProviderAdapter } from '~/infra/analytics/intercom/provider';
import { config } from '~/main/config/main';

export const makeIntercomAnalyticsProvider = (): IntercomAnalytics => {
	return new IntercomAnalyticsProviderAdapter(config.analytics.intercom.apiKey);
};
