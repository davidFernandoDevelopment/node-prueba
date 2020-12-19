import { UserEntity } from '../../../user/domain/entities/user.entity';

export interface AuthRepository {
	loginOperation: (user: UserEntity) => Promise<any>;
}
