import { faker } from '@faker-js/faker';
import { makeFakeUser } from '~/domain/tests/mocks/entities/users/user';

export const makeFakeLogAnalyticsPurchaseParams = () => {
	const user = makeFakeUser();
	return {
		payload: {
			payment: {
				price: faker.datatype.number({ min: 0 }),
				currency: 'BRL',
				tax: faker.datatype.number({ min: 0 }),
				coupon: null,
			},
			campaign: null,
		},
		user,
	};
};
