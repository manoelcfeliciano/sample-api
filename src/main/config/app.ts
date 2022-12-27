import express from 'express';
import { setupMiddlewares } from './middlewares/index';
import { setupRoutes } from './setup-routes';

export async function setupAppWithoutRoutes() {
	const app = express();
	setupMiddlewares(app);

	return app;
}

export async function setupApp() {
	const app = await setupAppWithoutRoutes();
	await setupRoutes(app);

	return app;
}
