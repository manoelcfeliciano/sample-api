import './config/module-alias';
import { setupApp } from './config/app';
import { config } from './config/main';

async function startServer() {
	const app = await setupApp();

	app.listen(config.server.port, () =>
		console.log(`Server running on port ${config.server.port}`)
	);
}

startServer();
