import chai from 'chai';
import chaiHttp from 'chai-http';
import * as apiUtil from '../test-utils/api.util';
import server from '../globalSetupTeardown.test';

chai.use(chaiHttp);
const should = chai.should();
const expect = chai.expect;
const endpoint = '/heartbeats';

describe('Testing Tokens Routes', () => {
  describe(`POST /heartbeats`, () => {
    it('should return a 401 if the token is not valid', (done) => {
      chai.request(server)
        .post(`${apiUtil.API}${endpoint}`)
        .set('Authorization', apiUtil.bearerAuthorization('itsatrickgetanaxe'))
        .send()
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
    it('should return a 200 if the operation was successful', (done) => {
      chai.request(server)
        .post(`${apiUtil.API}${endpoint}`)
        .set('Authorization', apiUtil.bearerAuthorization('t1'))
        .send()
        .end((err, res) => {
          res.should.have.status(204);
          done();
        });
    });
  });
});