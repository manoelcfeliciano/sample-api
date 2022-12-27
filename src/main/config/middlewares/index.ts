import { Express, json } from 'express';
import cors from 'cors';

export const setupMiddlewares = (app: Express): void => {
	app.use(
		cors({
			origin: ['*'],
			methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
			preflightContinue: false,
		})
	);
	app.use(json());
	app.use((req, res, next) => {
		res.type('json');
		next();
	});
};
