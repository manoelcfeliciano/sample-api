import { Client } from 'intercom-client';
import { IntercomAnalyticsProviderAdapter } from '.';

jest.mock('intercom-client', () => ({
	Client: class _Client {
		static __instance = jest.fn();
		static __createEvent = jest.fn();
		static __createUser = jest.fn();
		static __search = jest.fn();
		static clear = () => {
			_Client.__instance.mockClear();
			_Client.__createEvent.mockClear();
		};

		constructor(...args: any[]) {
			_Client.__instance(...args);
		}

		public events = {
			create: _Client.__createEvent,
		};

		public contacts = {
			search: _Client.__search,
			createUser: _Client.__createUser,
		};
	},
	Operators: {
		AND: 'AND',
	},
}));

const makeSut = () => {
	const stubs = {
		token: 'valid_token',
	};

	const sut = new IntercomAnalyticsProviderAdapter(stubs.token);

	return {
		sut,
		stubs,
	};
};

describe('IntercomAnalyticsProviderAdapter Test', () => {
	test('Should instantiate Intercom Client with proper authentication', () => {
		const constructorSpy = jest.spyOn(Client as any, '__instance');

		const { stubs } = makeSut();

		expect(constructorSpy).toHaveBeenCalledWith({ tokenAuth: { token: stubs.token } });
	});

	test('Should call intercom contacts createUser with proper params', async () => {
		const { sut } = makeSut();
		const fake = {
			event: 'any_event',
			params: {
				user: 'valid_user' as any,
				metadata: 'any_metadata' as any,
			},
		};

		jest.spyOn(Client as any, '__search').mockResolvedValue({ total_count: 0 });
		const createUserSpy = jest.spyOn(Client as any, '__createUser');

		await expect(sut.report(fake.event, fake.params)).resolves.not.toThrow();

		expect(createUserSpy).toHaveBeenCalledWith({
			name: fake.params.user.name,
			email: fake.params.user.email,
			externalId: fake.params.user.uuid,
		});
	});
});
