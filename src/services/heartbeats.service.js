/**
 * @author Jack Meyer
 *
 * Heartbeat Service which connects our application to posting to firebase.
 */
export default class HeartbeatService {
  constructor(newFirebaseService) {
    this.firebaseService = newFirebaseService;
  }
  /**
   * Posts are heartbeat to firebase
   *
   * @param id the of the project for the heartbeat
   */
  async postHeartBeatToFirebase(id) {
    this.firebaseService.postHeartbeatToFirebase(id);
  }

  /**
   * Posts are heartbeat to firebase
   *
   * @param id the of the project to fetch heartbeats for
   */
  async getHeartbeatsFromFirebase(id) {
    const heartbeats = await this.firebaseService.getHeartbeatsFromFirebase(id);
    return heartbeats;
  }
}
