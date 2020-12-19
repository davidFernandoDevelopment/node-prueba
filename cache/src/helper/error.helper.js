"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Errors = void 0;
class Errors {
    static handleError(fn) {
        return (req, res, next) => fn(req, res, next).catch(err => {
            let error;
            if (err['code']) {
                error = new Error('DATABASE ERROR');
                error.status = 500;
                error.message = err.name;
                error.stack = err;
            }
            else {
                error = new Error('ASYNC ERROR');
                error.status = err.status || 500;
                error.message = err.message;
                error.stack = err.stack;
            }
            next(error);
        });
    }
    static pathNotFound(req, res, next) {
        const error = new Error('PATH NOT FOUND');
        error.status = 404;
        next(error);
    }
    static genericError(err, req, res) {
        const objError = {
            name: err.name,
            status: 500,
            message: err.message,
        };
        if (process.env.NODE_ENV === 'development') {
            objError.stack = err.stack;
        }
        res.status(500).json(objError);
    }
}
exports.Errors = Errors;
