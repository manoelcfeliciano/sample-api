import { makeRemotePaymentConfirmPurchase } from '~/main/factories/data/payment/remote-confirm-purchase';
import { PaymentPurchaseController } from '../../../../../presentation/controllers/payment/purchase/index';

export const makePurchasePaymentController = (): PaymentPurchaseController => {
	return new PaymentPurchaseController(makeRemotePaymentConfirmPurchase());
};
