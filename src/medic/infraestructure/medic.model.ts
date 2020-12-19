import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	surname: {
		type: String,
		required: true,
		trim: true,
	},
	lastname: {
		type: String,
		required: true,
		trim: true,
	},
	cmp: {
		type: String,
		required: true,
		trim: true,
	},
	dni: {
		type: String,
		required: true,
		trim: true,
		maxlength: 9,
		lowercase: true,
		email: true,
		unique: true,
	},
	email: {
		type: String,
		required: true,
		trim: true,
	},
	photo: {
		type: String,
		required: true,
		trim: true,
	},
	isActive: {
		type: Boolean,
		default: true,
	},
	locations: [
		{
			type: String,
			required: true,
		},
	],
});

export default mongoose.model('Medic', schema);
