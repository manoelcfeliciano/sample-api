import { Router } from 'express';
import { adaptRoute } from '../adapters/express/route-adapter';
import { makePurchasePaymentController } from '../factories/presentation/controllers/payment/purchase';

export default (router: Router): void => {
	router.post('/payment/purchase', adaptRoute(makePurchasePaymentController()));
};
