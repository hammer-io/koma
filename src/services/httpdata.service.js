/**
 * @author Jack Meyer
 *
 * HTTP Data Service which connects our application to firebase and post HTTP Data from the user.
 */
export default class HTTPDataService {
  constructor(newFirebaseService, logger) {
    this.firebaseService = newFirebaseService;
    this.log = logger;
  }

  /**
   * Post http data to firebase
   *
   * @param id the of the project for the http data
   * @param data the data to post to firebase
   */
  async postHTTPDataToFirebase(id, data) {
    this.log.verbose(`HeartbeatService.postHTTPDataToFirebase(): Posting heartbeat for project with id: ${id}`);
    this.firebaseService.postHTTPDataToFirebase(id, data);
  }
}
