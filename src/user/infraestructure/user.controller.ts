import { GenericController } from '../../generics/generic.controller';
import { UserEntity } from '../domain/entities/user.entity';
import { UserUseCase } from '../application/user.usecase';

export class UserController extends GenericController<UserEntity> {
	constructor(private readonly usecase: UserUseCase) {
		super(usecase);
	}
}
