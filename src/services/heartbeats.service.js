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
    console.log(`Posting Heartbeat to Firebase for project with id: ${id}....`);
  }

  /**
   * Posts are heartbeat to firebase
   *
   * @param id the of the project to fetch heartbeats for
   */
  static async getHeartbeatsFromFirebase(id) {
    console.log(`Get Heartbeast from Firebase for project with id: ${id}....`);
  }
}
