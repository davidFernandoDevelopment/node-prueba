import { AuthRepository } from '../domain/repositories/auth.repository';
import { UserEntity } from '../../user/domain/entities/user.entity';
import bcryptjs from 'bcryptjs';
import { Tokens } from './auth.service';
import { RoleTokenDto } from './role-token.dto';

export class AuthUseCase {
	constructor(private readonly repository: AuthRepository) {}

	async loginUseCase(user: UserEntity): Promise<any> {
		const response: any = await this.repository.loginOperation(user);
		if (!response) return { status: false, message: 'El usuario no existe' };

		const { name, roles, password } = response;
		const userMatched: UserEntity = { name, roles, password };

		userMatched.roles = RoleTokenDto(userMatched.roles);

		const matched = await bcryptjs.compare(user.password, userMatched.password);

		if (matched) {
			return {
				status: true,
				accessToken: Tokens.generateAccessToken(userMatched),
				refreshToken: Tokens.generateRefreshToken(),
			};
		}
		return { status: false, message: 'Contraseña incorrecta' };
	}
}
