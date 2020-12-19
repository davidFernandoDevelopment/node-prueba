import { RoleEntity } from '../../role/domain/entities/role.entity';
import { RoleTokenRepository } from '../domain/repositories/role-token.repository';

const RoleTokenDto = (roles: RoleEntity[]): RoleTokenRepository[] => {
	const rolesToken: RoleTokenRepository[] = roles.map(role => ({
		name: role.name,
	}));

	return rolesToken;
};

export { RoleTokenDto };
