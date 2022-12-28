import { faker } from '@faker-js/faker';
import { makeFakeUser } from '~/domain/tests/mocks/entities/users/user';
import { IntercomAnalytics } from '~/infra/analytics/intercom/protocols/intercom';

export const makeFakeLogAnalyticsPurchaseParams = (params?: Partial<IntercomAnalytics.Params>) => {
	const user = makeFakeUser();

	return {
		payload: {
			payment: {
				price: faker.datatype.number({ min: 0 }),
				currency: 'BRL',
				coupon: null,
			},
			campaign: null,
		},
		user,
	};
};
