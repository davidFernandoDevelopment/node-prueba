"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const http_1 = __importDefault(require("http"));
const yenv_1 = __importDefault(require("yenv"));
const env = yenv_1.default();
class Server {
    constructor(app) {
        this.app = app;
    }
    initialize() {
        return new Promise((resolve, reject) => {
            const server = http_1.default.createServer(this.app);
            server
                .listen(env.PORT)
                .on('listening', () => {
                console.log(`SERVER RUNNING IN PORT ${server.address().port}`, `\nSERVER RUNNING ON PORT ${server.address().port}`);
                resolve('SERVER RUNNING IN PORT 3000');
            })
                .on('error', err => {
                console.log(err);
                reject(err);
            });
        });
    }
}
exports.Server = Server;
