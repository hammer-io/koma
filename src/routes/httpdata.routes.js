import express from 'express';
import authentication from '../utils/authentication';
import * as httpDataController from '../controllers/httpdata.controller';

export const router = express.Router();

/**
 * @api {post} /httpdata Post New HTTP Data
 * @apiVersion 1.0.0
 * @apiName Post HTTP Data
 * @apiGroup HTTP Data
 *
 * @apiPermission Bearer token such as 'Bearer 123-abc-456-def'
 **
 * @apiParamExample {json} Request Example:
 * {
 *  "type": "request or response",
 *  "size": 500,
 *  "timestamp": 1519933640293
 * }
 *
 */
router.post(
  '/httpdata',
  authentication.tokenAuthenticate,
  httpDataController.postNewHTTPData
);

export function setDependencies(httpDataService) {
  httpDataController.setDependencies(httpDataService);
}
