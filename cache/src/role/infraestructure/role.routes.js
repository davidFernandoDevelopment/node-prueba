"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const error_helper_1 = require("../../helper/error.helper");
const mongo_utils_1 = require("../../validators/mongo.utils");
const schema_validator_1 = require("../../validators/schema.validator");
const role_schema_1 = require("./role.schema");
const yenv_1 = __importDefault(require("yenv"));
const role_operations_1 = require("./role.operations");
const role_model_1 = __importDefault(require("./role.model"));
const role_usecase_1 = require("../application/role.usecase");
const role_controller_1 = require("./role.controller");
const env = yenv_1.default();
// SE INSTANCIAN X CADA PETICION Y LUEGO SE DESTRUYE
const roleOperations = new role_operations_1.RoleOperations(role_model_1.default);
const roleUseCase = new role_usecase_1.RoleUseCase(roleOperations);
const roleController = new role_controller_1.RoleController(roleUseCase);
const router = express_1.default.Router();
exports.router = router;
router.get('/', error_helper_1.Errors.handleError(async (req, res) => {
    const result = await roleController.getControllerGeneric({
        isActive: true,
    });
    res.json(result);
}));
router.get('/:id', [mongo_utils_1.validarId], error_helper_1.Errors.handleError(async (req, res) => {
    const id = req.params.id;
    const result = await roleController.getOneControllerGeneric(id);
    res.json(result);
}));
router.post('/', schema_validator_1.SchemaValidator.validate(role_schema_1.schemas.POST_INSERT), error_helper_1.Errors.handleError(async (req, res) => {
    const user = req.body;
    const result = await roleController.insertControllerGeneric(user);
    res.json(result);
}));
router.put('/:id', [mongo_utils_1.validarId, schema_validator_1.SchemaValidator.validate(role_schema_1.schemas.PUT_UPDATE)], error_helper_1.Errors.handleError(async (req, res) => {
    const id = req.params.id;
    const user = req.body;
    const result = await roleController.updateControllerGeneric({ _id: id }, user);
    res.json(result);
}));
router.delete('/:id', [mongo_utils_1.validarId], error_helper_1.Errors.handleError(async (req, res) => {
    const id = req.params.id;
    const result = await roleController.deleteControllerGeneric(id);
    res.json(result);
}));
router.get('/page/:page', [schema_validator_1.SchemaValidator.validate(role_schema_1.schemas.GET_PAGINATION)], error_helper_1.Errors.handleError(async (req, res) => {
    const page = +req.params.page;
    const result = await roleController.getByPageControllerGeneric({
        isActive: true,
    }, page, env.PAGINATION);
    res.json({
        status: 200,
        results: result,
    });
}));
