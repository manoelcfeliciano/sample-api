import './config/module-alias';
import app from './config/app';
import { config } from './config/main';

async function startServer() {
	app.listen(config.server.port, () =>
		console.log(`Server running on port ${config.server.port}`)
	);
}

startServer();
