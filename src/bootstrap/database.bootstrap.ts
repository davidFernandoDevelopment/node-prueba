import mongoose from 'mongoose';
import { DatabaseRepository } from './interfaces/database.interface';
import yenv from 'yenv';

const env = yenv();

export class Database implements DatabaseRepository {
	initialize(): Promise<any> {
		return new Promise((resolve, reject) => {
			const connectionString = `mongodb+srv://${env.DATABASE.MONGO.USER}:${env.DATABASE.MONGO.PASS}@${env.DATABASE.MONGO.HOST}/${env.DATABASE.MONGO.DB}?retryWrites=true&w=majority`;

			const options = {
				useNewUrlParser: true,
				useCreateIndex: true,
				useUnifiedTopology: true,
				useFindAndModify: false,
				poolSize: 10,
			};
			const callback = (error: any) => {
				if (error) {
					reject(error);
				} else {
					resolve('CONNECTION SUCCESSFULL !!!');
					console.log('CONNECTION SUCCESSFULL !!!');
				}
			};
			mongoose.connect(connectionString, options, callback);
		});
	}
	disconnect(): void {
		try {
			mongoose.disconnect();
		} catch (error) {
			console.log(error);
		}
	}
}
