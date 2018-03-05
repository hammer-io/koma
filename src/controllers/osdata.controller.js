let osDataService = {};


/**
 * Controller for POST /osdata
 * @param req the request object
 * @param res the response object
 * @param next the next middleware
 */
export async function postNewOSData(req, res, next) {
  try {
    // a "user" in terms of the passport is whoever is needing to be authenticated. In our case,
    // the user is the project
    await osDataService.postOSDataToFirebase(req.user.projectId, req.body);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

export function setDependencies(newOSDataService) {
  osDataService = newOSDataService;
}
