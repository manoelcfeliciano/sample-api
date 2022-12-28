import { PaymentPurchaseController } from '.';
import { makeAnyStub } from '../../../../tests/helpers/stub-maker/index';
import { PaymentConfirmPurchase } from '../../../../domain/use-cases/payment/confirm-purchase';
import { ok, serverError } from '~/presentation/helpers/http-helper';
import { makeFakeUser } from '../../../../domain/tests/mocks/entities/users/user';
import { faker } from '@faker-js/faker';

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

const fakePayload: PaymentPurchaseController.Request = {
	payment: {
		price: faker.datatype.number(),
		currency: 'BRL',
	},
	user: makeFakeUser(),
};

describe('PaymentPurchaseController Test', () => {
	test('should call remoteConfirmPurchase.confirm with correct parameters', async () => {
		const { sut, stubs } = makeSut();

		const remoteConfirmPurchaseSpy = jest.spyOn(stubs.remoteConfirmPurchase, 'confirm');

		await sut.handle(fakePayload);

		expect(remoteConfirmPurchaseSpy).toHaveBeenCalledWith({
			payment: {
				price: fakePayload.payment.price,
				currency: fakePayload.payment.currency,
			},
			user: {
				id: fakePayload.user.id,
				email: fakePayload.user.email,
				name: fakePayload.user.name,
			},
		});
	});

	test('should return an ok response', async () => {
		const { sut, stubs } = makeSut();

		jest.spyOn(stubs.remoteConfirmPurchase, 'confirm').mockResolvedValue();

		await expect(sut.handle(fakePayload)).resolves.toEqual(
			ok({
				message: 'Marked as purchased successfully',
			})
		);
	});

	test('should return serverError response if remoteConfirmPurchase.confirm throws', async () => {
		const { sut, stubs } = makeSut();

		const fakeError = new Error('fake-error');

		jest.spyOn(stubs.remoteConfirmPurchase, 'confirm').mockRejectedValue(fakeError);

		await expect(sut.handle(fakePayload)).resolves.toEqual(serverError(fakeError));
	});
});
