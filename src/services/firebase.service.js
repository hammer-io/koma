export default class FirebaseService {
  constructor(newFirebase) {
    this.firebase = newFirebase;
  }

  /**
   * Posts a heartbeat for the given proejct id
   * @param projectId the project id to post a heartbeat for
   */
  async postHeartbeatToFirebase(projectId) {
    const currentTime = Date.now();

    const heartbeats = this.firebase.database().ref('/heartbeats');
    const applicationHeartbeatsRef = heartbeats.child(projectId);
    applicationHeartbeatsRef.push({
      timestamp: currentTime
    });
  }

  async getHeartbeatsFromFirebase(projectId) {
    const heartbeatsRef = this.firebase.database().ref(`/heartbeats/${projectId}`);
    const heartbeats = await heartbeatsRef.once('value');
    return heartbeats;
  }
}
