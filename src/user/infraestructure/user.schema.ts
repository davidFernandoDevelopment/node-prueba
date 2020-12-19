import Joi from 'joi';

export const schemas = {
	POST_INSERT: {
		body: Joi.object({
			name: Joi.string().required().trim(),
			email: Joi.string().email().required().trim(),
			password: Joi.string().required().trim(),
			roles: Joi.array().required(),
			photo: Joi.string(),
		}),
	},
	PUT_UPDATE: {
		params: Joi.object({
			id: Joi.string(),
		}),
		body: Joi.object({
			name: Joi.string().trim(),
			email: Joi.string().email().trim(),
			password: Joi.string().trim(),
			roles: Joi.array(),
		}),
	},
	GET_GETONE: {
		params: Joi.object({
			id: Joi.string().required(),
		}),
	},
	DELETE: {
		params: Joi.object({
			id: Joi.string().required(),
		}),
	},
	GET_PAGINATION: {
		params: Joi.object({
			page: Joi.number().required(),
		}),
	},
};
