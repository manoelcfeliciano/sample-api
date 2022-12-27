import { RemotePaymentConfirmPurchase } from '../../../../../data/use-cases/payment/remote-confirm-purchase';
import { makeLogAnalyticsConfirmPurchase } from './analytics';

export const makeRemotePaymentConfirmPurchase = (): RemotePaymentConfirmPurchase => {
	return new RemotePaymentConfirmPurchase(makeLogAnalyticsConfirmPurchase());
};
