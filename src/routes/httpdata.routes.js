/* eslint-disable max-len */
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
 *
 * @apiParam {Number} status the status code of the request
 * @apiParam {String} url the url being requested
 * @apiParam {Number} requestSize the size of the request (in bytes)
 * @apiParam {String="GET","HEAD","POST","PUT","DELETE","CONNECT","OPTIONS","TRACE","PATCH"} method the http method used
 * @apiParam {Number} timestamp the number of milliseconds since January 1, 1970, 00:00:00 UTC
 * representing the timestamp of this request or response
 * @apiParam {Number} responseTime the number of milliseconds between request received and response sent
 *
 * @apiParamExample {json} Request Example:
 * {
 *  "status": "200",
 *  "url": "/index.html",
 *  "requestSize": 1280,
 *  "method": "GET",
 *  "timestamp": 1519933640293,
 *  "responseTime": 53
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
