import { faker } from '@faker-js/faker';
import { makeFakeUser } from '~/domain/tests/mocks/entities/users/user';
import { makeAnyStub } from '~/utils/tests/helpers/stub-maker';
import { RemotePaymentConfirmPurchase } from '.';
import { LogAnalyticsPurchase } from '../../../protocols/analytics/log-analytics-purchase';

const makeFakeParams = () => ({
	payment: {
		currency: 'BRL' as const,
		price: faker.datatype.number({ min: 0, max: 100 }),
	},
	user: makeFakeUser(),
});

const makeSut = () => {
	const stubs = {
		analytics: makeAnyStub<LogAnalyticsPurchase>('log'),
	};

	const sut = new RemotePaymentConfirmPurchase(stubs.analytics);

	return { sut, stubs };
};

describe('PaymentLogPurchase Test', () => {
	test('it should call log analytics once', async () => {
		const { sut, stubs } = makeSut();

		await sut.confirm(makeFakeParams());

		expect(stubs.analytics.log).toHaveBeenCalledTimes(1);
	});

	test('it should call log analytics with correct params', async () => {
		const { sut, stubs } = makeSut();

		const params = makeFakeParams();

		await sut.confirm(params);

		expect(stubs.analytics.log).toHaveBeenCalledWith({
			payload: {
				payment: {
					currency: params.payment.currency,
					price: params.payment.price,
				},
			},
			user: params.user,
		});
	});
});
