import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		trim: true,
		email: true,
		unique: true,
		lowercase: true,
	},
	password: {
		type: String,
		required: true,
		trim: true,
	},
	isActive: {
		type: Boolean,
		default: true,
	},
	refreshToken: {
		type: String,
		value: 'xyzw',
	},
	roles: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Role',
		},
	],
	photo: String,
});

export default mongoose.model('User', schema);
