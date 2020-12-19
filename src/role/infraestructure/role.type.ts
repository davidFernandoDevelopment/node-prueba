import { RoleEntity } from '../domain/entities/role.entity';
import { Document } from 'mongoose';

export type RoleType = RoleEntity & Document;
