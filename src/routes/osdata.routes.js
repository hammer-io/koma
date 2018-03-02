import express from 'express';
import authentication from '../utils/authentication';
import * as osDataController from '../controllers/osdata.controller';

export const router = express.Router();

/**
 * @api {post} /osdata Post New Heartbeat
 * @apiVersion 1.0.0
 * @apiName Post OS Data
 * @apiGroup OS Data
 *
 * @apiPermission Bearer token such as 'Bearer 123-abc-456-def'
 *
 * @apiParamExample {json} Request Example:
 * {
 *  "freeMemory": 500,
 *  "totalMemory": 1000,
 *  "memoryUsed": .5,
 *  "timestamp" "1519933640293"
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
