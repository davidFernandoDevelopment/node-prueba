import { GenericUseCase } from '../../generics/generic.usecase';
import { MedicEntity } from '../domain/entities/medic.entity';
import { MedicRepository } from '../domain/repositories/medic.repository';

export class MedicUseCase extends GenericUseCase<MedicEntity> {
	constructor(private readonly repository: MedicRepository) {
		super(repository);
	}
	getLocationUseCase(): void {
		this.repository.getLocation();
	}
}

// SOLO SE INSTANCIARA 1 VEZ
