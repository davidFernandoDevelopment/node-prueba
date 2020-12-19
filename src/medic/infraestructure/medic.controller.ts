import { GenericController } from '../../generics/generic.controller';
import { MedicUseCase } from '../application/medic.usecase';
import { MedicEntity } from '../domain/entities/medic.entity';

export class MedicController extends GenericController<MedicEntity> {
	constructor(private readonly usecase: MedicUseCase) {
		super(usecase);
	}
	getLocationController(): void {
		this.usecase.getLocationUseCase();
	}
}
