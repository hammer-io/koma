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
 * @apiParamExample {json} Request Example:
 * {
 *  "id": "111-1111-111"
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
