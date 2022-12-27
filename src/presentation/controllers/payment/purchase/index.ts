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
					price: 100,
					currency: 'BRL',
				},
				user: {
					id: 'valid-user-id',
					email: 'valid@email.com',
					name: 'valid-user-name',
				},
			});

			return ok({
				message: 'Purchased successfuly',
			});
		} catch (error) {
			return serverError(error);
		}
	}
}

export namespace PaymentPurchaseController {
	export type Request = {};
}
