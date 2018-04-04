export default class FirebaseService {
  constructor(newFirebase, logger) {
    this.firebase = newFirebase;
    this.log = logger;
    this.projectsRef = this.firebase.database().ref('/projects');
  }

  /**
   * Posts a heartbeat for the given proejct id
   * @param projectId the project id to post a heartbeat for
   * @param data the data for a heartbeat
   */
  async postHeartbeatToFirebase(projectId, data) {
    this.log.verbose(`FirebaseService.postHeartbeatToFirebase(): Posting heartbeat for project with id: ${projectId}`);
    const currentTime = Date.now();

    const project = this.projectsRef.child(projectId);
    const applicationHeartbeatsRef = project.child('heartbeats');
    applicationHeartbeatsRef.push({
      timestamp: currentTime,
      interval: data.interval
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

    const project = this.projectsRef.child(projectId);
    const osdataRef = project.child('osdata');
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

    const project = this.projectsRef.child(projectId);
    const httpdataRef = project.child('httpdata');
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
