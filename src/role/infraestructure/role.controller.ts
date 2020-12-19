import { GenericController } from '../../generics/generic.controller';
import { RoleEntity } from '../domain/entities/role.entity';
import { RoleUseCase } from '../application/role.usecase';

export class RoleController extends GenericController<RoleEntity> {
	constructor(private readonly usecase: RoleUseCase) {
		super(usecase);
	}
}
