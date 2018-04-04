import express from 'express';
import authentication from '../utils/authentication';
import * as heartbeatsController from '../controllers/heatbeat.controller';

export const router = express.Router();

/**
 * @api {post} /heartbeats Post New Heartbeat
 * @apiVersion 1.0.0
 * @apiName Post Heartbeat
 * @apiGroup Heartbeats
 *
 * @apiPermission Bearer token such as 'Bearer 123-abc-456-def'
 *
 * @apiParam {Number} interval the number of milliseconds until the next heartbeat is expected
 *
 * @apiParamExample {json} Request Example:
 * {
 *  "interval": 5000
 * }
 *
 */
router.post(
  '/heartbeats',
  authentication.tokenAuthenticate,
  heartbeatsController.postNewHeartbeat
);

export function setDependencies(heartbeatService) {
  heartbeatsController.setDependencies(heartbeatService);
}
