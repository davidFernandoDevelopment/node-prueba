import { Document } from 'mongoose';
import { MedicEntity } from '../domain/entities/medic.entity';

export type MedicType = MedicEntity & Document;
