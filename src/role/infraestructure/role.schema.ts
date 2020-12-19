import Joi from 'joi';

export const schemas = {
	POST_INSERT: {
		body: Joi.object({
			name: Joi.string().required().trim(),
		}),
	},
	PUT_UPDATE: {
		params: Joi.object({
			id: Joi.string(),
		}),
		body: Joi.object({
			name: Joi.string().trim(),
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
