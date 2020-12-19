import { GenericOperations } from '../../generics/generic.operations';
import { UserRepository } from '../domain/repositories/user.repository';
import UserModel from './user.model';
import { UserType } from './user.type';

export class UserOperations
	extends GenericOperations<typeof UserModel, UserType>
	implements UserRepository {
	constructor(private readonly model: typeof UserModel) {
		super(model);
	}
}
