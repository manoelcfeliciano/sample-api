import { LogAnalytics } from '~/domain/use-cases/analytics/log-analytics';
import { Jester } from '~/tests/helpers/jest-types';
import { LogAnalyticsComposite } from './index';

const makeAnalyticsStub = (implementation?: any): Jester.Mock.Stub<LogAnalytics> => ({
	log: jest.fn(implementation || (() => Promise.resolve())),
});

const makeSut = (analytics: LogAnalytics[]) => {
	const sut = new LogAnalyticsComposite(analytics);

	return { sut };
};

const anyParams = 'any-log-analytics-params' as any;

describe('LogAnalyticsComposite Test', () => {
	test('Should invoke every analytic in constructor', async () => {
		const analytics = [makeAnalyticsStub(), makeAnalyticsStub(), makeAnalyticsStub()];
		const { sut } = makeSut(analytics);

		await expect(sut.log(anyParams)).resolves.toBeUndefined();

		analytics.forEach((analytics) => expect(analytics.log).toHaveBeenCalledTimes(1));
	});

	test('Should wait for all log functions to resolve', async () => {
		let resolveCount = 0;

		const updateResolve = () => {
			resolveCount++;
		};

		const analytics = Array.from({ length: 3 }).map(() => {
			return makeAnalyticsStub(() => {
				updateResolve();
				return Promise.resolve();
			});
		});

		const { sut } = makeSut(analytics);

		await expect(sut.log(anyParams)).resolves.toBeUndefined();

		expect(resolveCount).toBe(analytics.length);
	});

	test('Should invoke every analytic in constructor with the incoming parameter', async () => {
		const analytics = Array.from({ length: 3 }).map(() => makeAnalyticsStub());

		const { sut } = makeSut(analytics);

		await expect(sut.log(anyParams)).resolves.toBeUndefined();

		analytics.forEach((analytics) => expect(analytics.log).toHaveBeenCalledWith(anyParams));
	});

	describe('If one log function throws', () => {
		test('all others will resolve', async () => {
			let resolveCount = 0;

			const updateResolve = () => {
				resolveCount++;
			};

			const err = new Error('any-error');

			const analytics1 = makeAnalyticsStub(updateResolve);
			const analytics2 = makeAnalyticsStub(() => Promise.reject(err));
			const analytics3 = makeAnalyticsStub(updateResolve);

			const analytics: LogAnalytics[] = [analytics1, analytics2, analytics3];

			const { sut } = makeSut(analytics);

			await expect(sut.log(anyParams)).rejects.toBeInstanceOf(Error);

			expect(resolveCount).toBe(2);
		});

		test('all errors should be reported', async () => {
			const err = new Error('any-error');

			const analytics1 = makeAnalyticsStub();
			const analytics2 = makeAnalyticsStub();
			const analytics3 = makeAnalyticsStub(() => Promise.reject(err));

			const analytics: LogAnalytics[] = [analytics1, analytics2, analytics3];

			const { sut } = makeSut(analytics);

			await expect(sut.log(anyParams)).rejects.toBeInstanceOf(Error);
		});
	});
});
