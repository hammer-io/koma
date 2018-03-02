/**
 * @author Jack Meyer
 *
 * OS Data Service which connects our application to posting to firebase.
 */
export default class OSDataService {
  constructor(newFirebaseService, logger) {
    this.firebaseService = newFirebaseService;
    this.log = logger;
  }

  /**
   * Posts are heartbeat to firebase
   *
   * @param id the of the project for the heartbeat
   * @param data the data to post to firebase
   */
  async postOSDataToFirebase(id, data) {
    this.log.verbose(`HeartbeatService.postOSDataToFirebase(): Posting heartbeat for project with id: ${id}`);
    this.firebaseService.postOSDataToFirebase(id, data);
  }
}
