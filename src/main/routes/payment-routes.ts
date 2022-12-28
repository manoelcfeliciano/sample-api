import { celebrate, Joi, Modes, Segments } from 'celebrate';
import { Router } from 'express';
import { adaptRoute } from '../adapters/express/route-adapter';
import { makePurchasePaymentController } from '../factories/presentation/controllers/payment/purchase';

export default (router: Router): void => {
	router.post(
		'/payment/purchase',
		celebrate({
			[Segments.BODY]: Joi.object().keys({
				payment: Joi.object()
					.keys({
						price: Joi.number().required(),
						currency: Joi.string().required(),
					})
					.required(),
				user: Joi.object()
					.keys({
						id: Joi.string().required(),
						email: Joi.string().email().required(),
						name: Joi.string().required(),
					})
					.required(),
			}),
		}),
		adaptRoute(makePurchasePaymentController())
	);
};
