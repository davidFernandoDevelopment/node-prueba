import { IRepository } from '../../../generics/generic.repository';
import { MedicEntity } from '../entities/medic.entity';

export interface MedicRepository extends IRepository<MedicEntity> {
	getLocation(): void;
}
