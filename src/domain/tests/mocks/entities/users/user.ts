import { faker } from '@faker-js/faker';
import { User } from '~/domain/entities/users/user';

export const makeFakeUser = (user?: Partial<User>): User => {
	return {
		id: faker.datatype.uuid(),
		email: faker.internet.email(),
		name: faker.name.firstName(),
		...user,
	};
};
