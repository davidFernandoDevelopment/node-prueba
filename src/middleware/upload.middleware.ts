import { Request } from 'express';
import path from 'path';
import multer from 'multer';
import multer_s3 from 'multer-s3';

import AWS from 'aws-sdk';

import yenv from 'yenv';
import { IError } from '../helper/error.helper';

const env = yenv();

AWS.config.update({
	accessKeyId: env.AWS.S3.ACCESS_KEY_ID,
	secretAccessKey: env.AWS.S3.SECRET_ACCESS_KEY,
	region: env.AWS.S3.REGION,
});
const S3 = new AWS.S3();

const fileFilter = (req: Request, file: Express.Multer.File, cb: any) => {
	const partsFile = file.originalname.split('.');
	if (!file.mimetype.startsWith('image/')) {
		const error: IError = new Error('No es una imagen');
		error.status = 500;
		cb(error, false);
	} else if (partsFile.length === 1) {
		const error: IError = new Error('Image sin extension');
		error.status = 500;
		cb(error, false);
	} else {
		cb(null, true);
	}
};

export class Upload {
	static S3(fieldName: string) {
		return multer({
			fileFilter,
			limits: {
				fileSize: 5242880,
			},
			storage: multer_s3({
				s3: S3,
				bucket: env.AWS.S3.BUCKET_NAME,
				metadata(req, file, cb) {
					cb(null, { fieldName: file.fieldname });
				},
				key(req: Request, file, cb) {
					const extension = path.extname(file.originalname);
					const name = Date.now().toString();
					const newFile = name + extension;

					req.body.photo = `https://${env.AWS.S3.BUCKET_NAME}.s3.us-east-2.amazonaws.com/${newFile}`;
					cb(null, newFile);
				},
			}),
		}).single(fieldName);
	}
}
