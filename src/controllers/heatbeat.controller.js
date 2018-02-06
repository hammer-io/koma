import { validationResult } from 'express-validator/check';

let heartbeatService = {};


/**
 * Controller for POST /heartbeats
 * @param req the request object
 * @param res the response object
 * @param next the next middleware
 */
export async function postNewHeartbeat(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.mapped() });
  }

  try {
    await heartbeatService.postHeartbeatToFirebase(req.body.id);
    res.send('success');
  } catch (error) {
    next(error);
  }
}

/**
 * Controller for GET /heartbeats/:id
 * @param req the request object
 * @param res the response object
 * @param next the next middleware
 */
export async function getHeartbeats(req, res, next) {
  try {
    const heartbeats = await heartbeatService.getHeartbeatsFromFirebase(req.params.id);
    res.send({ heartbeats });
  } catch (error) {
    next(error);
  }
}

export function setDependencies(newHeartBeatService) {
  heartbeatService = newHeartBeatService;
}
