import chai from 'chai';
import chaiHttp from 'chai-http';
import * as apiUtil from '../test-utils/api.util';
import server from '../globalSetupTeardown.test';

chai.use(chaiHttp);
const should = chai.should();
const expect = chai.expect;

describe('Testing Tokens Routes', () => {
  describe('POST /tokens', () => {
    const endpoint = '/tokens';
    it('should return a new token for the project if properly authenticated', (done) => {
      const req = { "projectId": "123abc" };
      chai.request(server)
        .post(`${apiUtil.API}${endpoint}`)
        .set('Authorization', apiUtil.bearerAuthorization('supersecret'))
        .send(req)
        .end((err, res) => {
          res.should.have.status(200);
          expect(err).to.be.a('null');
          // expect(res.body).to.be.an('object');
          // expect(res.body.access_token.expired).to.equal(false);
          // expect(res.body.access_token.value).to.not.be.an('undefined');
          // expect(res.body.access_token.userId).to.equal('a3');
          // expect(res.body.token_type).to.equal('Bearer');
          done();
        });
    });

    it('should return stats 401 Unauthorized if authorization is missing', (done) => {
      const req = {};
      chai.request(server)
        .post(`${apiUtil.API}${endpoint}`)
        .send(req)
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });

    it('should return stats 401 Unauthorized if authorization is invalid', (done) => {
      const req = {};
      chai.request(server)
        .post(`${apiUtil.API}${endpoint}`)
        .set('Authorization', apiUtil.bearerAuthorization('lijawelfijasdf'))
        .send(req)
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });

  describe('GET /tokens', () => {
  });

  describe('DELETE /tokens/:tokenId', () => {
  });
});
