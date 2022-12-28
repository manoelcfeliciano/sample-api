import request from 'supertest';
import app from '~/main/config/app';

describe('Health Routes', () => {
	test('Should return 200', async () => {
		await request(app).get('/api/health').send().expect(200);
	});
});
