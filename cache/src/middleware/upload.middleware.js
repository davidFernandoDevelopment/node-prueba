"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Upload = void 0;
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const yenv_1 = __importDefault(require("yenv"));
const env = yenv_1.default();
aws_sdk_1.default.config.update({
    accessKeyId: env.AWS.S3.ACCESS_KEY_ID,
    secretAccessKey: env.AWS.S3.SECRET_ACCESS_KEY,
    region: env.AWS.S3.REGION,
});
const S3 = new aws_sdk_1.default.S3();
const fileFilter = (req, file, cb) => {
    const partsFile = file.originalname.split('.');
    if (!file.mimetype.startsWith('image/')) {
        const error = new Error('No es una imagen');
        error.status = 500;
        cb(error, false);
    }
    else if (partsFile.length === 1) {
        const error = new Error('Image sin extension');
        error.status = 500;
        cb(error, false);
    }
    else {
        cb(null, true);
    }
};
class Upload {
    static S3(fieldName) {
        return multer_1.default({
            fileFilter,
            limits: {
                fileSize: 5242880,
            },
            storage: multer_s3_1.default({
                s3: S3,
                bucket: env.AWS.S3.BUCKET_NAME,
                metadata(req, file, cb) {
                    cb(null, { fieldName: file.fieldname });
                },
                key(req, file, cb) {
                    const extension = path_1.default.extname(file.originalname);
                    const name = Date.now().toString();
                    const newFile = name + extension;
                    req.body.photo = `https://${env.AWS.S3.BUCKET_NAME}.s3.us-east-2.amazonaws.com/${newFile}`;
                    cb(null, newFile);
                },
            }),
        }).single(fieldName);
    }
}
exports.Upload = Upload;
