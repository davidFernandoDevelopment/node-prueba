"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const user_model_1 = __importDefault(require("./user.model"));
const user_operations_1 = require("./user.operations");
const user_usecase_1 = require("../application/user.usecase");
const user_controller_1 = require("./user.controller");
const error_helper_1 = require("../../helper/error.helper");
const mongo_utils_1 = require("../../validators/mongo.utils");
const schema_validator_1 = require("../../validators/schema.validator");
const user_schema_1 = require("./user.schema");
const yenv_1 = __importDefault(require("yenv"));
const autenticacion_guard_1 = require("../../guards/autenticacion.guard");
const authorizaton_guard_1 = require("../../guards/authorizaton.guard");
const upload_middleware_1 = require("../../middleware/upload.middleware");
const env = yenv_1.default();
const userOperations = new user_operations_1.UserOperations(user_model_1.default);
const userUseCase = new user_usecase_1.UserUseCase(userOperations);
const userController = new user_controller_1.UserController(userUseCase);
const router = express_1.default.Router();
exports.router = router;
router.get('/', [autenticacion_guard_1.AuthenticationGuard.conActivate, authorizaton_guard_1.AuthorizationGuard.conActivate('ADMIN')], error_helper_1.Errors.handleError(async (req, res) => {
    const result = await userController.getControllerGeneric({
        isActive: true,
    });
    res.json(result);
}));
router.get('/:id', [
    autenticacion_guard_1.AuthenticationGuard.conActivate,
    authorizaton_guard_1.AuthorizationGuard.conActivate('ADMIN'),
    mongo_utils_1.validarId,
], error_helper_1.Errors.handleError(async (req, res) => {
    const id = req.params.id;
    const result = await userController.getOneControllerGeneric(id);
    res.json(result);
}));
router.post('/', [upload_middleware_1.Upload.S3('photo')], schema_validator_1.SchemaValidator.validate(user_schema_1.schemas.POST_INSERT), error_helper_1.Errors.handleError(async (req, res) => {
    const user = req.body;
    const result = await userController.insertControllerGeneric(user);
    res.json(result);
}));
router.put('/:id', [
    autenticacion_guard_1.AuthenticationGuard.conActivate,
    authorizaton_guard_1.AuthorizationGuard.conActivate('ADMIN'),
    mongo_utils_1.validarId,
    schema_validator_1.SchemaValidator.validate(user_schema_1.schemas.PUT_UPDATE),
], error_helper_1.Errors.handleError(async (req, res) => {
    const id = req.params.id;
    const user = req.body;
    const result = await userController.updateControllerGeneric({ _id: id }, user);
    res.json(result);
}));
router.delete('/:id', [
    autenticacion_guard_1.AuthenticationGuard.conActivate,
    authorizaton_guard_1.AuthorizationGuard.conActivate('ADMIN'),
    mongo_utils_1.validarId,
], error_helper_1.Errors.handleError(async (req, res) => {
    const id = req.params.id;
    const result = await userController.deleteControllerGeneric(id);
    res.json(result);
}));
router.get('/page/:page', [
    autenticacion_guard_1.AuthenticationGuard.conActivate,
    authorizaton_guard_1.AuthorizationGuard.conActivate('ADMIN'),
    schema_validator_1.SchemaValidator.validate(user_schema_1.schemas.GET_PAGINATION),
], error_helper_1.Errors.handleError(async (req, res) => {
    const page = +req.params.page;
    const result = await userController.getByPageControllerGeneric({
        isActive: true,
    }, page, env.PAGINATION);
    res.json({
        status: 200,
        results: result,
    });
}));
router.post('/upload/image', upload_middleware_1.Upload.S3('photo'), async (req, res) => {
    res.json({ url: req.file.buffer });
});
