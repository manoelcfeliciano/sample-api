import { makeIntercomAnalyticsStub } from '../../tests/mocks/intercom';
import { makeFakeLogAnalyticsPurchaseParams as makeFakeParams } from '~/infra/analytics/tests/mocks/make-log-analytics-purchase-params';
import { IntercomLogPurchase } from './index';

const PURCHASE_EVENT_NAME = 'made purchase';

const makeSut = () => {
	const stubs = {
		intercom: makeIntercomAnalyticsStub(),
	};

	const sut = new IntercomLogPurchase(stubs.intercom);

	return { sut, stubs };
};

describe('IntercomPurchaseSubscription Test', () => {
	test('Should report to intercom once', async () => {
		const { sut, stubs } = makeSut();

		await sut.log(makeFakeParams());

		expect(stubs.intercom.report).toHaveBeenCalledTimes(1);
	});

	test('Should wait for intercom.report to resolve', async () => {
		const { sut, stubs } = makeSut();

		let resolved = false;
		stubs.intercom.report.mockImplementationOnce(
			() =>
				new Promise((resolve) => {
					setImmediate(() => {
						resolved = true;
						resolve();
					});
				})
		);
		await sut.log(makeFakeParams());
		expect(resolved).toBe(true);
	});

	test('Should call intercom.report with correct parameters', async () => {
		const { sut, stubs } = makeSut();

		const params = makeFakeParams();
		const metadata = {
			affiliation: 'web_checkout',
			item_category: 'purchase',
			item_variant: 'default',
			price: {
				amount: params.payload.payment.price * 100,
				currency: params.payload.payment.currency,
			},
		};

		await sut.log(params);
		expect(stubs.intercom.report).toHaveBeenCalledWith(PURCHASE_EVENT_NAME, {
			user: params.user,
			metadata,
		});
	});
});
