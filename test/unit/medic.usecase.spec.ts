import { MedicUseCase } from '../../src/medic/application/medic.usecase';
import { MedicEntity } from '../../src/medic/domain/entities/medic.entity';
import { MedicOperations } from '../../src/medic/infraestructure/medic.operations';
import MedicModel from '../../src/medic/infraestructure/medic.model';
import medicMock from '../mocks/medic.mock.json';

describe('medic.usecase', () => {
	let medicUseCase: MedicUseCase;
	let medicOperation: MedicOperations;
	beforeAll(() => {
		(MedicOperations as jest.Mock) = jest.fn().mockReturnValue({
			insertOperationGeneric: jest.fn().mockReturnValue(medicMock[0]),
			getAllOperationGeneric: jest.fn().mockReturnValue(medicMock),
			getByIDOperationGeneric: jest.fn().mockReturnValue(medicMock[0]),
			getByPageOperationGeneric: jest
				.fn()
				.mockReturnValue({ total: 2, items: medicMock }),
		});
		medicOperation = new MedicOperations(MedicModel);
		medicUseCase = new MedicUseCase(medicOperation);
	});
	it('insert', async () => {
		const result = await medicUseCase.insertUseCaseGeneric(medicMock[0]);
		expect(result).toEqual(medicMock[0]);
	});
	it('getAll', async () => {
		const result = await medicUseCase.getUseCaseGeneric({ isActive: true });
		expect(result).toEqual(medicMock);
	});
	it('getOne', async () => {
		const result = await medicUseCase.getOneUseCaseGeneric(0);
		expect(result).toEqual(medicMock[0]);
	});
	it('getByPage', async () => {
		const result = await medicUseCase.getByPageGeneric(
			{ isActive: true },
			0,
			2
		);
		expect(result).toEqual({ total: medicMock.length, items: medicMock });
	});
	it('update', async () => {});
	it('delete', async () => {});
});
