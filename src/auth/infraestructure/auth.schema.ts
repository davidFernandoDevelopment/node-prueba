import Joi from 'joi';

export const schemas = {
	LOGIN: {
		body: Joi.object({
			email: Joi.string().email().required().trim(),
			password: Joi.string().required().trim(),
		}),
	},
};
