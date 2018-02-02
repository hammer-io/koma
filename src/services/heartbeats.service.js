import FirebaseService from './firebase.service';

/**
 * @author Jack Meyer
 *
 * Heartbeat Service which connects our application to posting to firebase.
 */
export default class HeartbeatService {
  /**
   * Posts are heartbeat to firebase
   *
   * @param id the of the project for the heartbeat
   */
  static async postHeartBeatToFirebase(id) {
    const firebase = new FirebaseService();
    await firebase.postHeartbeatToFirebase(id);
  }

  /**
   * Posts are heartbeat to firebase
   *
   * @param id the of the project to fetch heartbeats for
   */
  static async getHeartbeatsFromFirebase(id) {
    const firebase = new FirebaseService();
    const heartbeats = await firebase.getHeartbeatsFromFirebase(id);
    return heartbeats;
  }
}
