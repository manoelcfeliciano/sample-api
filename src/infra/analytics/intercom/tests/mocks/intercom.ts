import { IntercomAnalytics } from '~/infra/analytics/intercom/protocols/intercom';
import { makeAnyStub } from '~/utils/tests/helpers/stub-maker';

export const makeIntercomAnalyticsStub = () => makeAnyStub<IntercomAnalytics>('report');
