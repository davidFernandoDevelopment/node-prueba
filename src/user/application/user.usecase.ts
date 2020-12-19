import { GenericUseCase } from '../../generics/generic.usecase';
import { UserEntity } from '../domain/entities/user.entity';
import { UserRepository } from '../domain/repositories/user.repository';
import bcryptjs from 'bcryptjs';

export class UserUseCase extends GenericUseCase<UserEntity> {
	constructor(private readonly repository: UserRepository) {
		super(repository);
	}
	async insertUseCaseGeneric(user: UserEntity): Promise<UserEntity> {
		const password: string = await bcryptjs.hash(user.password, 10);
		user.password = password;
		return this.repository.insertOperationGeneric(user);
	}
}
