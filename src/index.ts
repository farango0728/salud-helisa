import initializeServer from './config/server';
import registerModules from './config/modules';
import config from './config';
import initializeDatabase from './config/database/initializeDatabase';
import initializePlugins from './config/plugins';

async function startServer() {
	// Initialize Hapi Server
	const server = initializeServer();
	// Initialize database
	await initializeDatabase(__dirname).connect(server);
	// Register modules (APIs for this project)
	await registerModules(server);
	// Register plugins
	await initializePlugins(server);
	// Start the server
	await server.start();
	console.log(
		`\x1b[34m------------- Project: ${config.project.name}, Server run ${server.info.uri} ------------- \x1b[0m`,
	);
}

(async function init() {
	try {
		await startServer();
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
})();
