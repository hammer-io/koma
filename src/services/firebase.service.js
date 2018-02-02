import config from 'config';
import firebase from 'firebase-admin';


export default class FirebaseService {
  constructor() {
    const serviceAccount = config.get('firebase.serviceAccount');
    const databaseURL = config.get('firebase.databaseUrl');
    firebase.initializeApp({
      credential: firebase.credential.cert(serviceAccount),
      databaseURL
    });
  }

  /**
   * Posts a heartbeat for the given proejct id
   * @param projectId the project id to post a heartbeat for
   */
  static async postHeartbeatToFirebase(projectId) {
    const currentTime = Date.now();

    const heartbeats = firebase.database().ref('/heartbeats');
    const applicationHeartbeatsRef = heartbeats.child(projectId);
    applicationHeartbeatsRef.push({
      timestamp: currentTime
    });
  }

  static async getHeartbeatsFromFirebase(projectId) {
    const heartbeatsRef = firebase.database().ref(`/heartbeats/${projectId}`);
    const heartbeats = await heartbeatsRef.once('value');
    return heartbeats;
  }
}
