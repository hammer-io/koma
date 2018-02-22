import config from 'config';
import passport from 'passport';
import BearerStrategy from 'passport-http-bearer';
import LocalStrategy from 'passport-local';
import TokenService from '../services/token.service';
import Sequelize from '../db/sequelize';
import { getActiveLogger } from './winston';

const authSecret = config.get('auth.secret');

/**
 * The only authorized client is Endor, who also has the secret.
 * Endor must always authenticate users to ensure those with
 * correct access level can access the project being requested.
 */
passport.use(new BearerStrategy('bearer', (accessToken, done) => {
  if (accessToken === authSecret) {
    return done(null, { scope: '*' });
  }
  return done(null, false);
}));

/**
 * Used for validating a projectId and the token
 *
 * By default, passport-local looks for username and password, the first json overrides what it
 * is looking for.
 */
passport.use(new LocalStrategy(
  {
    usernameField: 'projectId',
    passwordField: 'token'
  },
  async (projectId, token, done) => {
    const tokenService = new TokenService(Sequelize.Credentials, getActiveLogger());
    const tokenFound = await tokenService.getToken(projectId);
    if (projectId === tokenFound.projectId && tokenFound.token === token) {
      return done(null, { scope: '*' });
    }

    return done(null, false);
  }
));

exports.isEndorAuthenticated = passport.authenticate('bearer', { session: false });
exports.isTokenAuthenticated = passport.authenticate('local', { session: false });
