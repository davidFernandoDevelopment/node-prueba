"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const schema_validator_1 = require("../../validators/schema.validator");
const auth_schema_1 = require("./auth.schema");
const auth_controller_1 = require("./auth.controller");
const auth_usecase_1 = require("../application/auth.usecase");
const auth_operations_1 = require("./auth.operations");
const authOperations = new auth_operations_1.AuthOperations();
const authUseCase = new auth_usecase_1.AuthUseCase(authOperations);
const authController = new auth_controller_1.AuthController(authUseCase);
const router = express_1.default.Router();
exports.router = router;
router.post('/', schema_validator_1.SchemaValidator.validate(auth_schema_1.schemas.LOGIN), async (req, res) => {
    const user = req.body;
    const result = await authController.loginController(user);
    if (result.status) {
        res.json(result);
    }
    else {
        res.status(404).send(result.message);
    }
});
