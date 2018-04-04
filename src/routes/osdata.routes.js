import express from 'express';
import authentication from '../utils/authentication';
import * as osDataController from '../controllers/osdata.controller';

export const router = express.Router();

/**
 * @api {post} /osdata Post New OS Data
 * @apiVersion 1.0.0
 * @apiName Post OS Data
 * @apiGroup OS Data
 *
 * @apiPermission Bearer token such as 'Bearer 123-abc-456-def'
 *
 * @apiParam {Number} freeMemory the amount of free memory available (in bytes)
 * @apiParam {Number} totalMemory the total size of memory (in bytes)
 * @apiParam {Number{0.0-1.0}} memoryUsed the percentage of memory used
 * @apiParam {Number} timestamp the number of milliseconds since January 1, 1970, 00:00:00 UTC
 * representing the timestamp of this snapshot
 *
 * @apiParamExample {json} Request Example:
 * {
 *  "freeMemory": 5000000000,
 *  "totalMemory": 10000000000,
 *  "memoryUsed": 0.5,
 *  "timestamp": "1519933640293"
 * }
 *
 */
router.post(
  '/osdata',
  authentication.tokenAuthenticate,
  osDataController.postNewOSData
);

export function setDependencies(osDataService) {
  osDataController.setDependencies(osDataService);
}
