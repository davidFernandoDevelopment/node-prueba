import http from 'http';
import { Application } from 'express';
import { AddressInfo } from 'net'; // LIBRERIA DE NODE

import yenv from 'yenv';

const env = yenv();

export class Server {
	constructor(private readonly app: Application) {}

	initialize() {
		return new Promise((resolve, reject) => {
			const server: http.Server = http.createServer(this.app);
			server
				.listen(env.PORT)
				.on('listening', () => {
					console.log(
						`SERVER RUNNING IN PORT ${(<AddressInfo>server.address()).port}`,
						`\nSERVER RUNNING ON PORT ${(server.address() as AddressInfo).port}`
					);
					resolve('SERVER RUNNING IN PORT 3000');
				})
				.on('error', err => {
					console.log(err);
					reject(err);
				});
		});
	}
}
