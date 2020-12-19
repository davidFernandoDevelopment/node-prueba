import { GenericOperations } from '../../generics/generic.operations';
import RoleModel from './role.model';
import { RoleType } from './role.type';
import { RoleRepository } from '../domain/repositories/role.repository';

export class RoleOperations
	extends GenericOperations<typeof RoleModel, RoleType>
	implements RoleRepository {
	constructor(private readonly model: typeof RoleModel) {
		super(model);
	}
}
