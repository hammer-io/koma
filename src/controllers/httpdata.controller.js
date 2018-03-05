let httpDataService = {};


/**
 * Controller for POST /heartbeats
 * @param req the request object
 * @param res the response object
 * @param next the next middleware
 */
export async function postNewHTTPData(req, res, next) {
  try {
    // a "user" in terms of the passport is whoever is needing to be authenticated. In our case,
    // the user is the project
    await httpDataService.postHTTPDataToFirebase(req.user.projectId, req.body);
    res.send('success');
  } catch (error) {
    next(error);
  }
}

export function setDependencies(newHttpDataService) {
  httpDataService = newHttpDataService;
}
