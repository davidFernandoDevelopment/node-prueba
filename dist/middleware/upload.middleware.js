"use strict";var __importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0}),exports.Upload=void 0;const path_1=__importDefault(require("path")),multer_1=__importDefault(require("multer")),multer_s3_1=__importDefault(require("multer-s3")),aws_sdk_1=__importDefault(require("aws-sdk")),yenv_1=__importDefault(require("yenv")),env=yenv_1.default();aws_sdk_1.default.config.update({accessKeyId:env.AWS.S3.ACCESS_KEY_ID,secretAccessKey:env.AWS.S3.SECRET_ACCESS_KEY,region:env.AWS.S3.REGION});const S3=new aws_sdk_1.default.S3,fileFilter=(e,t,s)=>{const a=t.originalname.split(".");if(t.mimetype.startsWith("image/"))if(1===a.length){const e=new Error("Image sin extension");e.status=500,s(e,!1)}else s(null,!0);else{const e=new Error("No es una imagen");e.status=500,s(e,!1)}};class Upload{static S3(e){return multer_1.default({fileFilter:fileFilter,limits:{fileSize:5242880},storage:multer_s3_1.default({s3:S3,bucket:env.AWS.S3.BUCKET_NAME,metadata(e,t,s){s(null,{fieldName:t.fieldname})},key(e,t,s){const a=path_1.default.extname(t.originalname),l=Date.now().toString()+a;e.body.photo=`https://${env.AWS.S3.BUCKET_NAME}.s3.us-east-2.amazonaws.com/${l}`,s(null,l)}})}).single(e)}}exports.Upload=Upload;