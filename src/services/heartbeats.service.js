/**
 * @author Jack Meyer
 *
 * Heartbeat Service which connects our application to posting to firebase.
 */
export default class HeartbeatService {
  constructor(newFirebaseService, logger) {
    this.firebaseService = newFirebaseService;
    this.log = logger;
  }

  /**
   * Posts are heartbeat to firebase
   *
   * @param id the of the project for the heartbeat
   */
  async postHeartbeatToFirebase(id) {
    this.log.verbose(`HeartbeatService.postHeartbeatToFirebase(): Posting heartbeat for project with id: ${id}`);
    this.firebaseService.postHeartbeatToFirebase(id);
  }

  /**
   * Posts are heartbeat to firebase
   *
   * @param id the of the project to fetch heartbeats for
   */
  async getHeartbeatsFromFirebase(id) {
    this.log.verbose(`HeartbeatService.getHeartbeatsFromFirebase(): Getting heartbeats for project with id: ${id}`);
    const heartbeats = await this.firebaseService.getHeartbeatsFromFirebase(id);
    return heartbeats;
  }
}
