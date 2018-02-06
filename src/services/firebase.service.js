export default class FirebaseService {
  constructor(newFirebase, logger) {
    this.firebase = newFirebase;
    this.log = logger;
  }

  /**
   * Posts a heartbeat for the given proejct id
   * @param projectId the project id to post a heartbeat for
   */
  async postHeartbeatToFirebase(projectId) {
    this.log.verbose(`FirebaseService.postHeartbeatToFirebase(): Posting heartbeat for project with id: ${projectId}`);
    const currentTime = Date.now();

    const heartbeats = this.firebase.database().ref('/heartbeats');
    const applicationHeartbeatsRef = heartbeats.child(projectId);
    applicationHeartbeatsRef.push({
      timestamp: currentTime
    });
  }

  async getHeartbeatsFromFirebase(projectId) {
    this.log.verbose(`FirebaseService.getHeartbeatsFromFirebase(): Getting heartbeats for project with id: ${projectId}`);
    const heartbeatsRef = this.firebase.database().ref(`/heartbeats/${projectId}`);
    const heartbeats = await heartbeatsRef.once('value');
    return heartbeats;
  }
}
