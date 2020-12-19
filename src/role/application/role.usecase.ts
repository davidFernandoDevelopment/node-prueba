import { GenericUseCase } from '../../generics/generic.usecase';
import { RoleEntity } from '../domain/entities/role.entity';
import { RoleRepository } from '../domain/repositories/role.repository';

export class RoleUseCase extends GenericUseCase<RoleEntity> {
	constructor(private readonly repository: RoleRepository) {
		super(repository);
	}
}
