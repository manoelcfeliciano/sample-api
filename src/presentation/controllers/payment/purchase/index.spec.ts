import { PaymentPurchaseController } from '.';
import { makeAnyStub } from '../../../../tests/helpers/stub-maker/index';
import { PaymentConfirmPurchase } from '../../../../domain/use-cases/payment/confirm-purchase';
import { ok } from '~/presentation/helpers/http-helper';

const makeSut = () => {
	const stubs = {
		remoteConfirmPurchase: makeAnyStub<PaymentConfirmPurchase>('confirm'),
	};

	const sut = new PaymentPurchaseController(stubs.remoteConfirmPurchase);

	return {
		sut,
		stubs,
	};
};

describe('PaymentPurchaseController Test', () => {
	test('should call logAnalytics with correct parameters', async () => {
		const { sut, stubs } = makeSut();

		const remoteConfirmPurchaseSpy = jest.spyOn(stubs.remoteConfirmPurchase, 'confirm');

		await sut.handle({});

		expect(remoteConfirmPurchaseSpy).toHaveBeenCalledWith({
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
	});

	test('should return an ok response', async () => {
		const { sut, stubs } = makeSut();

		jest.spyOn(stubs.remoteConfirmPurchase, 'confirm').mockResolvedValue();

		await expect(sut.handle({})).resolves.toEqual(
			ok({
				message: 'Purchased successfuly',
			})
		);
	});
});
