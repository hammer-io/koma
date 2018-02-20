import server from '../src/index';
import { getActiveLogger } from '../src/utils/winston';

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

beforeEach(() => {
  getActiveLogger().info(`::::::: TEST ${testIndex++}`);
});

module.exports = server;
