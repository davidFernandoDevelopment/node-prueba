import { UserEntity } from '../../user/domain/entities/user.entity';
import moment from 'moment';
import jwt_simple from 'jwt-simple';
import yenv from 'yenv';
import { v4 as uuidv4 } from 'uuid';

const env = yenv();

export class Tokens {
	static generateAccessToken(user: UserEntity): string {
		const payload = {
			iat: moment().unix(),
			exp: moment().add(env.TOKEN.TIMEOUT, env.TOKEN.UNITS).unix(),
			name: user.name,
			roles: user.roles,
		};
		const accessToken = jwt_simple.encode(payload, env.TOKEN.KEYWORD);
		return accessToken;
	}

	static generateRefreshToken(): string {
		const refreshToken = uuidv4();
		return refreshToken;
	}

	static validateAccessToken(accessToken: string): Promise<any> {
		return new Promise((resolve, reject) => {
			try {
				const payload = jwt_simple.decode(accessToken, env.TOKEN.KEYWORD);
				resolve(payload);
			} catch (error) {
				if (error.message.toLowerCase() === 'token expired') {
					reject({
						status: 409,
						message: 'Token expired',
					});
				} else {
					reject({
						status: 401,
						message: 'Token invalid, no seas raton modificando el token !!!',
					});
				}
			}
		});
	}
}
