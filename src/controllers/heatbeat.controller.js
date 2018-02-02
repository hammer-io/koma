import HeartbeatService from '../services/heartbeats.service';

/**
 * Controller for POST /heartbeats
 * @param req the request object
 * @param res the response object
 */
export async function postNewHeartbeat(req, res) {
  await HeartbeatService.postHeartBeatToFirebase(req.body.id);
  res.send({ endpoint: 'POST /heartbeats' });
}

/**
 * Controller for GET /heartbeats/:id
 * @param req the request object
 * @param res the response object
 */
export async function getHeartbeats(req, res) {
  const heartbeats = await HeartbeatService.getHeartbeatsFromFirebase(req.params.id);
  res.send({ heartbeats });
}
