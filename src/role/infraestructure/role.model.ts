import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	isActive: {
		type: Boolean,
		default: true,
	},
});

export default mongoose.model('Role', schema);
