import { AuthRepository } from '../domain/repositories/auth.repository';
import { UserEntity } from '../../user/domain/entities/user.entity';
import UserModel from '../../user/infraestructure/user.model';
import { UserType } from '../../user/infraestructure/user.type';

export class AuthOperations implements AuthRepository {
	async loginOperation(user: UserEntity): Promise<any> {
		const response: UserType = await UserModel.findOne({
			email: user.email,
		}).populate('roles');
		return response;
	}
}
