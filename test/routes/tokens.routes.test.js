import chai from 'chai';
import chaiHttp from 'chai-http';
import * as apiUtil from '../test-utils/api.util';
import server from '../globalSetupTeardown.test';

chai.use(chaiHttp);
const should = chai.should();
const expect = chai.expect;
const endpoint = '/tokens';

describe('Testing Tokens Routes', () => {
  describe(`all ${endpoint} requests`, () => {
    it('should have at least 1000 millisecond delay in response', (done) => {
      const start = Date.now();
      chai.request(server)
        .post(`${apiUtil.API}${endpoint}`)
        .send({ "projectId": "123abc" })
        .end((err, res) => {
          const duration = Date.now() - start;
          expect(duration).to.be.greaterThan(1000);
          res.should.have.status(401);
          done();
        });
    });
    it('should return stats 401 Unauthorized if authorization is missing', (done) => {
      const start = Date.now();
      chai.request(server)
        .get(`${apiUtil.API}${endpoint}`)
        .query({ "projectId": "123abc" })
        .end((err, res) => {
          const duration = Date.now() - start;
          expect(duration).to.be.greaterThan(1000);
          res.should.have.status(401);
          done();
        });
    });
    it('should return stats 401 Unauthorized if authorization is invalid', (done) => {
      const start = Date.now();
      chai.request(server)
        .delete(`${apiUtil.API}${endpoint}`)
        .set('Authorization', apiUtil.bearerAuthorization('itsatrickgetanaxe'))
        .send({ "projectId": "123abc" })
        .end((err, res) => {
          const duration = Date.now() - start;
          expect(duration).to.be.greaterThan(1000);
          res.should.have.status(401);
          done();
        });
    });
  });

  describe(`POST ${endpoint}`, () => {
    it('should return a new token for the project', (done) => {
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
  });

  describe(`GET ${endpoint}`, () => {
  });

  describe(`DELETE ${endpoint}/:tokenId`, () => {
  });
});
