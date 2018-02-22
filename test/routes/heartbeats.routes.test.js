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
    it('should return a 400 if the user is does not have a projectId', (done) => {
      chai.request(server)
        .post(`${apiUtil.API}${endpoint}`)
        .send({ 'projectId': 'p1' })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it('should return a 400 if the user is does not have a token', (done) => {
      chai.request(server)
        .post(`${apiUtil.API}${endpoint}`)
        .send({ 'token': 't1' })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });

    it('should return a 401 if the user is unauthenticated (token & projectId combo not valid)', (done) => {
      chai.request(server)
        .post(`${apiUtil.API}${endpoint}`)
        .send({ 'projectId': 'p1', 'token': 't10000' })
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
    it('should return a 200 if the operation was successful', (done) => {
      const start = Date.now();
      chai.request(server)
        .post(`${apiUtil.API}${endpoint}`)
        .send({ 'projectId': 'p1', 'token': 't1' })
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});