"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const medic_usecase_1 = require("../application/medic.usecase");
const medic_controller_1 = require("./medic.controller");
const medic_operations_1 = require("./medic.operations");
const medic_model_1 = __importDefault(require("./medic.model"));
const schema_validator_1 = require("../../validators/schema.validator");
const medic_schema_1 = require("./medic.schema");
const mongo_utils_1 = require("../../validators/mongo.utils");
const yenv_1 = __importDefault(require("yenv"));
const error_helper_1 = require("../../helper/error.helper");
const env = yenv_1.default();
const medicOperations = new medic_operations_1.MedicOperations(medic_model_1.default);
const medicUseCase = new medic_usecase_1.MedicUseCase(medicOperations);
const medicController = new medic_controller_1.MedicController(medicUseCase);
const router = express_1.default.Router();
exports.router = router;
router.get('/', error_helper_1.Errors.handleError(async (req, res) => {
    const result = await medicController.getControllerGeneric({
        isActive: true,
    });
    res.json(result);
}));
router.get('/:id', error_helper_1.Errors.handleError(async (req, res) => {
    const id = req.params.id;
    const result = await medicController.getOneControllerGeneric(id);
    res.json(result);
}));
router.post('/', schema_validator_1.SchemaValidator.validate(medic_schema_1.schemas.POST_INSERT), error_helper_1.Errors.handleError(async (req, res) => {
    const medic = req.body;
    const result = await medicController.insertControllerGeneric(medic);
    res.json(result);
}));
router.put('/:id', [mongo_utils_1.validarId, schema_validator_1.SchemaValidator.validate(medic_schema_1.schemas.PUT_UPDATE)], error_helper_1.Errors.handleError(async (req, res) => {
    const medic = req.body;
    const id = req.params.id;
    const result = await medicController.updateControllerGeneric({ _id: id }, medic);
    res.json(result);
}));
router.delete('/:id', [mongo_utils_1.validarId], error_helper_1.Errors.handleError(async (req, res) => {
    const id = req.params.id;
    const result = await medicController.deleteControllerGeneric(id);
    res.json(result);
}));
router.get('/page/:page', schema_validator_1.SchemaValidator.validate(medic_schema_1.schemas.GET_PAGINATION), error_helper_1.Errors.handleError(async (req, res) => {
    const page = +req.params.page;
    const result = await medicController.getByPageControllerGeneric({ isActive: false }, page, env.PAGINATION);
    res.json({ status: 200, results: result });
}));
