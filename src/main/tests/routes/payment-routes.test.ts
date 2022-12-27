import request from 'supertest';
import app from '~/main/config/app';

describe('Payment Routes', () => {
	test('Should return 200', async () => {
		await request(app).post('/api/payment/purchase').send({}).expect(200);
	});
});
