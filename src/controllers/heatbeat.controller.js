import HeartbeatService from '../services/heartbeats.service';


export async function postNewHeartbeat(req, res) {
  HeartbeatService.postHeartBeatToFirebase(req.body.id);
  res.send({ endpoint: 'POST /heartbeats' });
}

export async function getHeartbeats(req, res) {
  console.log(req.params);
  HeartbeatService.getHeartbeatsFromFirebase(req.params.id);
  res.send({ endpoint: 'GET /heartbeats' });
}
