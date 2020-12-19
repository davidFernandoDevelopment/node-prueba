"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_bootstrap_1 = require("./bootstrap/server.bootstrap");
const database_bootstrap_1 = require("./bootstrap/database.bootstrap");
const app_1 = __importDefault(require("./app"));
const start = async () => {
    const server = new server_bootstrap_1.Server(app_1.default);
    const database = new database_bootstrap_1.Database();
    try {
        await server.initialize();
        await database.initialize();
    }
    catch (error) {
        database.disconnect();
    }
};
start();
