import { Request, Response } from 'express';
import { Controller } from '~/presentation/protocols/controller';

export const adaptRoute = (controller: Controller) => {
	return async (req: Request, res: Response) => {
		const response = await controller.handle(req);

		if (response.statusCode >= 200 && response.statusCode <= 299) {
			res.status(response.statusCode).json(response.body);
		} else {
			res.status(response.statusCode).json({
				error: response.body.message,
			});
		}
	};
};
