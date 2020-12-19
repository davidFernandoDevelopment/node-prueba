import { AuthUseCase } from '../application/auth.usecase';
import { UserEntity } from '../../user/domain/entities/user.entity';

export class AuthController {
	constructor(private readonly usecase: AuthUseCase) {}
	async loginController(user: UserEntity): Promise<any> {
		return await this.usecase.loginUseCase(user);
	}
}
