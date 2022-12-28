import { PaymentConfirmPurchase } from '~/domain/use-cases/payment/confirm-purchase';
import { ok, serverError } from '~/presentation/helpers/http-helper';
import { Controller } from '~/presentation/protocols/controller';
import { HttpResponse } from '~/presentation/protocols/http';

export class PaymentPurchaseController implements Controller {
	constructor(private readonly remoteConfirmPurchase: PaymentConfirmPurchase) {}

	async handle(request: PaymentPurchaseController.Request): Promise<HttpResponse> {
		try {
			await this.remoteConfirmPurchase.confirm({
				payment: {
					price: request.payment.price,
					currency: request.payment.currency,
				},
				user: request.user,
			});

			return ok({
				message: 'Marked as purchased successfully',
			});
		} catch (error) {
			return serverError(error);
		}
	}
}

export namespace PaymentPurchaseController {
	export type Request = {
		payment: {
			price: number;
			currency: string;
		};
		user: {
			id: string;
			email: string;
			name: string;
		};
	};
}
