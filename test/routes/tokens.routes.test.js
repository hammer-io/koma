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
    it('should return status 401 Unauthorized if authorization is missing', (done) => {
      const start = Date.now();
      chai.request(server)
        .get(`${apiUtil.API}${endpoint}/123abc`)
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
        .delete(`${apiUtil.API}${endpoint}/123abc`)
        .set('Authorization', apiUtil.bearerAuthorization('itsatrickgetanaxe'))
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
      const req = { "projectId": "p2" };
      chai.request(server)
        .post(`${apiUtil.API}${endpoint}`)
        .set('Authorization', apiUtil.bearerAuthorization('supersecret'))
        .send(req)
        .end((err, res) => {
          res.should.have.status(201);
          expect(err).to.be.a('null');
          expect(res.body).to.be.an('object');
          expect(res.body.token.token).to.not.be.an('undefined');
          expect(res.body.token.id).to.not.be.an('undefined');
          expect(res.body.token.projectId).to.equal('p2');
          done();
        });
    });
  });

  describe(`GET ${endpoint}`, () => {
    it('should return a token for the project', (done) => {
      chai.request(server)
        .get(`${apiUtil.API}${endpoint}/p1`)
        .set('Authorization', apiUtil.bearerAuthorization('supersecret'))
        .end((err, res) => {
          res.should.have.status(200);
          expect(err).to.be.a('null');
          expect(res.body).to.be.an('object');
          expect(res.body.token.token).to.equal('t1');
          expect(res.body.token.id).to.equal('i1');
          expect(res.body.token.projectId).to.equal('p1');
          done();
        });
    });

    it('should have an error if the token cannot be found', (done) => {
      chai.request(server)
        .get(`${apiUtil.API}${endpoint}/p10000`)
        .set('Authorization', apiUtil.bearerAuthorization('supersecret'))
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    })
  });

  describe(`DELETE ${endpoint}/:tokenId`, () => {
    it('should delete the token', (done) => {
      chai.request(server)
        .delete(`${apiUtil.API}${endpoint}/p1`)
        .set('Authorization', apiUtil.bearerAuthorization('supersecret'))
        .end((err, res) => {
          res.should.have.status(204);
          done();
        });
    });

    it('should have an error if the token cannot be found', (done) => {
      chai.request(server)
        .delete(`${apiUtil.API}${endpoint}/p10000`)
        .set('Authorization', apiUtil.bearerAuthorization('supersecret'))
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    })
  });
});
