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

  /**
   * Posts os data for the given project
   * @param projectId the project id to send to firebase
   * @param data the os memory data
   * @returns {Promise<void>}
   */
  async postOSDataToFirebase(projectId, data) {
    this.log.verbose(`FirebaseService.postOSDataToFirebase(): Posting os data for project with id: ${projectId}`);
    const osdata = this.firebase.database().ref('/osdata');
    const osdataRef = osdata.child(projectId);
    osdataRef.push({
      memoryUsed: data.memoryUsed,
      totalMemory: data.totalMemory,
      freeMemory: data.freeMemory,
      timestamp: data.timestamp
    });
  }

  /**
   * Posts HTTP data for the given project to firebase
   * @param projectId the project id to send to firebase
   * @param data the http data
   * @returns {Promise<void>}
   */
  async postHTTPDataToFirebase(projectId, data) {
    this.log.verbose(`FirebaseService.postOSDataToFirebase(): Posting http data for project with id: ${projectId}`);

    const httpdata = this.firebase.database().ref('/httpdata');
    const httpdataRef = httpdata.child(projectId);
    httpdataRef.push({
      status: data.status,
      url: data.url,
      requestSize: data.requestSize,
      method: data.method,
      timestamp: data.timestamp,
      responseTime: data.responseTime
    });
  }
}
