import chai from 'chai';
import TokenService from '../../src/services/token.service';
import Sequelize from '../../src/db/sequelize';
import { getActiveLogger } from '../../src/utils/winston';

const should = chai.should();
const expect = chai.expect;

describe('Testing Tokens Service', () => {

  const tokenService = new TokenService(Sequelize.Credentials, getActiveLogger());

  describe('createNewToken()', async () => {
    it('should create a new token for a project', async () => {
      const token = await tokenService.createNewToken('p2');
      expect(token.token).to.not.be.a('null');
      expect(token.id).to.not.be.a('null');
      expect(token.projectId).to.equal('p2');
    });

    it('should throw an error if project already exists', async () => {
      try {
        const token = await tokenService.createNewToken('p1');
        expect(true).to.equal(false); // should fail
      } catch (error) {
        expect(error.message).to.equal('Token already exists for p1');
      }
    });
  });

  describe('getToken()', async () => {
    it('should get a token for a project', async () => {
      const token = await tokenService.getToken('p1');
      expect(token.token).to.not.be.a('t1');
      expect(token.id).to.not.be.a('i1');
      expect(token.projectId).to.equal('p1');
    });

    it('should get a token for an id', async () => {
      const token = await tokenService.getToken('i1');
      expect(token.token).to.not.be.a('t1');
      expect(token.id).to.not.be.a('i1');
      expect(token.projectId).to.equal('p1');
    });

    it('should throw an error if there is no token', async () => {
      try {
        const token = await tokenService.getToken('p10000');
        expect(true).to.equal(false); // should fail
      } catch (error) {
        expect(error.message).to.equal('Token with id p10000 not found');
      }
    });
  });

  describe('getProjectIdByToken()', async () => {
    it('should get a projectId for a token', async () => {
      const project = await tokenService.getProjectIdByToken('t1');
      expect(project).to.equal('p1');
    });

    it('should throw an error if there is no token', async () => {
      try {
        const token = await tokenService.getProjectIdByToken('t10000');
        expect(true).to.equal(false); // should fail
      } catch (error) {
        expect(error.message).to.equal('Token t10000 not found');
      }
    });
  });

  describe('deleteToken()', async () => {
    it('should successfully delete a token' , async () => {
      await tokenService.deleteToken('p1');
      try {
        const token = await tokenService.getToken('p1');
        expect(true).to.equal(false); // should fail
      } catch (error) {
        expect(error.message).to.equal('Token with id p1 not found');
      }
    });

    it('should throw an error if there is no token to delete', async () => {
      try {
        const token = await tokenService.deleteToken('p10000');
        expect(true).to.equal(false); // should fail
      } catch (error) {
        expect(error.message).to.equal('Token with id p10000 not found');
      }
    });
  });
});