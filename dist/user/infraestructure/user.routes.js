"use strict";var __importDefault=this&&this.__importDefault||function(r){return r&&r.__esModule?r:{default:r}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.router=void 0;const express_1=__importDefault(require("express")),user_model_1=__importDefault(require("./user.model")),user_operations_1=require("./user.operations"),user_usecase_1=require("../application/user.usecase"),user_controller_1=require("./user.controller"),error_helper_1=require("../../helper/error.helper"),mongo_utils_1=require("../../validators/mongo.utils"),schema_validator_1=require("../../validators/schema.validator"),user_schema_1=require("./user.schema"),yenv_1=__importDefault(require("yenv")),autenticacion_guard_1=require("../../guards/autenticacion.guard"),authorizaton_guard_1=require("../../guards/authorizaton.guard"),upload_middleware_1=require("../../middleware/upload.middleware"),env=yenv_1.default(),userOperations=new user_operations_1.UserOperations(user_model_1.default),userUseCase=new user_usecase_1.UserUseCase(userOperations),userController=new user_controller_1.UserController(userUseCase),router=express_1.default.Router();exports.router=router,router.get("/",[autenticacion_guard_1.AuthenticationGuard.conActivate,authorizaton_guard_1.AuthorizationGuard.conActivate("ADMIN")],error_helper_1.Errors.handleError(async(r,e)=>{const a=await userController.getControllerGeneric({isActive:!0});e.json(a)})),router.get("/:id",[autenticacion_guard_1.AuthenticationGuard.conActivate,authorizaton_guard_1.AuthorizationGuard.conActivate("ADMIN"),mongo_utils_1.validarId],error_helper_1.Errors.handleError(async(r,e)=>{const a=r.params.id,o=await userController.getOneControllerGeneric(a);e.json(o)})),router.post("/",[upload_middleware_1.Upload.S3("photo")],schema_validator_1.SchemaValidator.validate(user_schema_1.schemas.POST_INSERT),error_helper_1.Errors.handleError(async(r,e)=>{const a=r.body,o=await userController.insertControllerGeneric(a);e.json(o)})),router.put("/:id",[autenticacion_guard_1.AuthenticationGuard.conActivate,authorizaton_guard_1.AuthorizationGuard.conActivate("ADMIN"),mongo_utils_1.validarId,schema_validator_1.SchemaValidator.validate(user_schema_1.schemas.PUT_UPDATE)],error_helper_1.Errors.handleError(async(r,e)=>{const a=r.params.id,o=r.body,t=await userController.updateControllerGeneric({_id:a},o);e.json(t)})),router.delete("/:id",[autenticacion_guard_1.AuthenticationGuard.conActivate,authorizaton_guard_1.AuthorizationGuard.conActivate("ADMIN"),mongo_utils_1.validarId],error_helper_1.Errors.handleError(async(r,e)=>{const a=r.params.id,o=await userController.deleteControllerGeneric(a);e.json(o)})),router.get("/page/:page",[autenticacion_guard_1.AuthenticationGuard.conActivate,authorizaton_guard_1.AuthorizationGuard.conActivate("ADMIN"),schema_validator_1.SchemaValidator.validate(user_schema_1.schemas.GET_PAGINATION)],error_helper_1.Errors.handleError(async(r,e)=>{const a=+r.params.page,o=await userController.getByPageControllerGeneric({isActive:!0},a,env.PAGINATION);e.json({status:200,results:o})})),router.post("/upload/image",upload_middleware_1.Upload.S3("photo"),async(r,e)=>{e.json({url:r.file.buffer})});