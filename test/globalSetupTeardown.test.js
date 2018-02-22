import MockFirebase from './test-utils/mockFirebase'
import { getActiveLogger } from '../src/utils/winston';
import * as firebase from '../src/utils/firebase';
import Sequelize from '../src/db/sequelize';
import * as db from '../src/db/init_database';

firebase.set(new MockFirebase(), {});
const server = require('../src/index');

before(async () => {
  console.log('Beginning Koma Test Suite');
  getActiveLogger().info('---------------------------------------------------------------');
  getActiveLogger().info('-------------------  BEGINNING TEST SUITE  --------------------');
  getActiveLogger().info('---------------------------------------------------------------');
});

after(() => {
  getActiveLogger().info('---------------------------------------------------------------');
  getActiveLogger().info('-------------------  TEST SUITE COMPLETE  ---------------------');
  getActiveLogger().info('---------------------------------------------------------------');
  console.log('Koma Test Suite Complete!');
  // Do any cleanup if necessary
  server.close();
});

let testIndex = 0;

beforeEach(async () => {
  getActiveLogger().info(`::::::: TEST ${testIndex++}`);
  await db.defineTables();
  Sequelize.Credentials.create({
    id: 'i1',
    token: 't1',
    projectId: 'p1'
  });
});

module.exports = server;
