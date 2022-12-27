import { IntercomAnalytics } from '~/infra/analytics/intercom/protocols/intercom';
import { makeAnyStub } from '~/tests/helpers/stub-maker';

export const makeIntercomAnalyticsStub = () => makeAnyStub<IntercomAnalytics>('report');
