/* eslint-disable import/prefer-default-export */
import express from 'express';
import * as heartbeatsController from '../controllers/heatbeat.controller';

export const router = express.Router();

/**
 * @api {post} /heartbeats Post New Heartbeat
 * @apiVersion 1.0.0
 * @apiName Post Heartbeat
 * @apiGroup Heartbeats
 *
 * @apiPermission None
 *
 * @apiParam {String} id The id of the project which is posting a new heartbeat
 *
 * @apiParamExample {json} Request Example:
 * {
 *  "id": "111-1111-111"
 * }
 *
 */
router.post('/heartbeats', heartbeatsController.postNewHeartbeat);


/**
 * @api {get} /heartbeats Get Heartbeats
 * @apiVersion 1.0.0
 * @apiName Get Heartbeat
 * @apiGroup Heartbeats
 *
 * @apiPermission None
 *
 * @apiParam {String} id The id of the project which is posting a new heartbeat
 *
 * @apiSuccessExample {json} Response Example
 * HTTP/1.1 200 OK
 * [
 *  {"timestamp": "1452488445471"}
 * ]
 *
 */
router.get('/heartbeats/:id', heartbeatsController.getHeartbeats);

export function setDependencies(heartbeatService) {
  heartbeatsController.setDependencies(heartbeatService);
}
