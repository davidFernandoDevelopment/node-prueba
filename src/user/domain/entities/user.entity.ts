export interface UserEntity {
	name?: string;
	email?: string;
	password?: string;
	isActive?: boolean;
	refreshToken?: string;
	roles?: Array<any>; // ALGUNAS VECES CON STRING Y OTRAS CON JSON
	photo?: string;
}
