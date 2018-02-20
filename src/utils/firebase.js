import admin from 'firebase-admin';
import config from 'config';

let options = {};
let isSet = false;
let isInitialized = false;
const fbConfig = config.get('firebase');

export function init() {
  if (!isSet) {
    module.exports.instance = admin;
    options = {
      credential: admin.credential.cert(fbConfig.serviceAccount),
      databaseURL: fbConfig.databaseURL
    };
    isSet = true;
  }
  if (!isInitialized) {
    module.exports.instance.initializeApp(options);
    isInitialized = true;
  }
}

export function set(firebaseDependency, initializationOptions) {
  module.exports.instance = firebaseDependency;
  options = initializationOptions;
  isSet = true;
}

module.exports.instance = {};
