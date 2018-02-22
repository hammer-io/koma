import express from 'express';
import authentication from '../utils/authentication';
import * as heartbeatsController from '../controllers/heatbeat.controller';
import * as heartbeatsMiddleware from '../middlewares/heatbeats.middleware';

export const router = express.Router();

/**
 * @api {post} /heartbeats Post New Heartbeat
 * @apiVersion 1.0.0
 * @apiName Post Heartbeat
 * @apiGroup Heartbeats
 *
 * @apiPermission Authenticated Project
 *
 * @apiParam {String} projectId The id of the project which is posting a new heartbeat
 * @apiParam {String} token The token for authentication
 *
 * @apiParamExample {json} Request Example:
 * {
 *  "id": "111-1111-111"
 * }
 *
 */
router.post(
  '/heartbeats',
  heartbeatsMiddleware.checkPostNewHeartbeats(),
  authentication.isTokenAuthenticated,
  heartbeatsController.postNewHeartbeat
);

export function setDependencies(heartbeatService) {
  heartbeatsController.setDependencies(heartbeatService);
}
