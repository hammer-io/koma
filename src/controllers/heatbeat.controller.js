let heartbeatService = {};


/**
 * Controller for POST /heartbeats
 * @param req the request object
 * @param res the response object
 * @param next the next middleware
 */
export async function postNewHeartbeat(req, res, next) {
  try {
    // a "user" in terms of the passport is whoever is needing to be authenticated. In our case,
    // the user is the project
    await heartbeatService.postHeartbeatToFirebase(req.user.projectId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

export function setDependencies(newHeartBeatService) {
  heartbeatService = newHeartBeatService;
}
