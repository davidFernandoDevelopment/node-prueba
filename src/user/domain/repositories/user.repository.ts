import { IRepository } from '../../../generics/generic.repository';
import { UserEntity } from '../entities/user.entity';

export type UserRepository = IRepository<UserEntity>;
