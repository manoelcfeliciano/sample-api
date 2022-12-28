import express from 'express';
import { setupBeforeRoutesMiddlewares } from './middlewares/before-routes';
import { setupAfterRoutesMiddlewares } from './middlewares/after-routes';
import { setupRoutes } from './setup-routes';

const app = express();
setupBeforeRoutesMiddlewares(app);
setupRoutes(app);
setupAfterRoutesMiddlewares(app);

export default app;
