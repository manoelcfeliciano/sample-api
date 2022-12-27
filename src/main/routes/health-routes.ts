import { Router } from 'express';

export default (router: Router): void => {
	router.get('/health', (_req, res) => {
		return res.json({ message: 'Health check passed', success: true }).status(201);
	});
};
