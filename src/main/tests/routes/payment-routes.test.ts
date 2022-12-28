import request from 'supertest';
import app from '~/main/config/app';

describe('Payment Routes', () => {
	test('Should return 200', async () => {
		await request(app)
			.post('/api/payment/purchase')
			.send({
				payment: {
					price: 10,
					currency: 'BRL',
				},
				user: {
					id: '123',
					email: 'john@doe.com',
					name: 'John Doe',
				},
			})
			.expect(200);
	});

	test('Should return 400 when input is not valid', async () => {
		await request(app).post('/api/payment/purchase').send({}).expect(400);
	});
});
