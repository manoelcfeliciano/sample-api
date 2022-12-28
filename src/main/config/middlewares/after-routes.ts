import { Express, json } from 'express';
import { errors } from 'celebrate';

export const setupAfterRoutesMiddlewares = (app: Express): void => {
	app.use(errors());
};
