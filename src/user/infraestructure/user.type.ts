import { Document } from 'mongoose';
import { UserEntity } from '../domain/entities/user.entity';

export type UserType = UserEntity & Document;
