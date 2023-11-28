import Server from './server/app';
import config from './config/config';
const server: Server = Server.bootstrap();

server.run(config.port, () => {
	console.log(`http://localhost:${config.port}`);
});