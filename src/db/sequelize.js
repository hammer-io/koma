import config from 'config';
import Sequelzie from 'sequelize';

const {
  STRING,
  UUID,
  UUIDV4
} = Sequelzie.DataTypes;

let initialized = false;
function initManually(database, username, password, options) {
  const model = new Sequelzie(
    database,
    username,
    password,
    options
  );
  initialized = true;

  const Credentials = model.define('credentials', {
    id: {
      primaryKey: true,
      type: UUID,
      defaultValue: UUIDV4
    },

    projectId: STRING,
    token: {
      type: UUID,
      defaultValue: UUIDV4
    },
  });

  module.exports.model = model;
  module.exports.Credentials = Credentials;
}

function initWithConfigs() {
  if (!initialized) {
    const db = config.get('database');
    initManually(db.database, db.username, db.password, db.options);
  }
}

module.exports.isInitialized = () => initialized;
/**
 * This function lets you initialize sequelize with the configuration file
 * @type {initWithConfigs}
 */
module.exports.initSequelize = initWithConfigs;
/**
 * This function, on the other hand, lets you initialize sequelize manually
 * @type {initManually}
 */
module.exports.initManually = initManually;
