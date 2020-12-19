"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaValidator = void 0;
class SchemaValidator {
    static generateError(objError, next) {
        const error = new Error(objError.name);
        error.status = objError.status;
        error.message = objError.message;
        error.stack = objError.stack;
        next(error);
    }
    static validate(schemaValidation) {
        return (req, res, next) => {
            const listContainerParameters = ['headers', 'body', 'params', 'query'];
            const listValidations = [];
            listContainerParameters.forEach((container) => {
                if (schemaValidation['container']) {
                    switch (container) {
                        case 'body':
                            listValidations.push(schemaValidation[container].validate(req.body));
                            break;
                        case 'params':
                            listValidations.push(schemaValidation[container].validate(req.params));
                            break;
                        case 'query':
                            listValidations.push(schemaValidation[container].validate(req.query));
                            break;
                        case 'headers':
                            listValidations.push(schemaValidation[container].validate(req.headers));
                            break;
                    }
                }
            });
            return Promise.all(listValidations).then(results => {
                let hasError = false;
                results.forEach(result => {
                    if (result.error && !hasError) {
                        hasError = true;
                        this.generateError({
                            status: 411,
                            stack: result.error,
                            name: 'PARAMETERS ERROR',
                            message: 'ERROR IN PARAMETERS',
                        }, next);
                    }
                });
                if (!hasError)
                    next();
            }, error => {
                this.generateError({
                    status: 411,
                    stack: error.error,
                    name: 'PARAMETERS ERROR',
                    message: 'ERROR IN PARAMETERS',
                }, next);
            });
        };
    }
}
exports.SchemaValidator = SchemaValidator;
// schemaValidation: GENERAL PARA RECIBIR
// MAS DE 1 ESQUEMA DE VALIDACION
