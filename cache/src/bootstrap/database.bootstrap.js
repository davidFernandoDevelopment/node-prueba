"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const yenv_1 = __importDefault(require("yenv"));
const env = yenv_1.default();
class Database {
    initialize() {
        return new Promise((resolve, reject) => {
            const connectionString = `mongodb+srv://${env.DATABASE.MONGO.USER}:${env.DATABASE.MONGO.PASS}@${env.DATABASE.MONGO.HOST}/${env.DATABASE.MONGO.DB}?retryWrites=true&w=majority`;
            const options = {
                useNewUrlParser: true,
                useCreateIndex: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
                poolSize: 10,
            };
            const callback = (error) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve('CONNECTION SUCCESSFULL !!!');
                    console.log('CONNECTION SUCCESSFULL !!!');
                }
            };
            mongoose_1.default.connect(connectionString, options, callback);
        });
    }
    disconnect() {
        try {
            mongoose_1.default.disconnect();
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.Database = Database;
