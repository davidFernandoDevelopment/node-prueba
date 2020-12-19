import Joi from 'joi';

export const schemas = {
	POST_INSERT: {
		body: Joi.object({
			name: Joi.string().required().trim(),
			surname: Joi.string().required().trim(),
			lastname: Joi.string().required().trim(),
			cmp: Joi.string().required().trim(),
			dni: Joi.string().required().trim(),
			photo: Joi.string().required().trim(),
			email: Joi.string().email().required().trim(),
			locations: Joi.array().required(),
		}),
	},
	PUT_UPDATE: {
		params: Joi.object({
			id: Joi.string(),
		}),
		body: Joi.object({
			name: Joi.string().trim(),
			surname: Joi.string().trim(),
			lastname: Joi.string().trim(),
			cmp: Joi.string().trim(),
			dni: Joi.string().trim(),
			photo: Joi.string().trim(),
			email: Joi.string().email().trim(),
			locations: Joi.array(),
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
