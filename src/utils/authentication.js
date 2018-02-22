import config from 'config';
import passport from 'passport';
import BearerStrategy from 'passport-http-bearer';
import TokenService from '../services/token.service';
import Sequelize from '../db/sequelize';
import { getActiveLogger } from './winston';

const authSecret = config.get('auth.secret');

/**
 * The only authorized client is Endor, who also has the secret.
 * Endor must always authenticate users to ensure those with
 * correct access level can access the project being requested.
 */
passport.use('endorBearer', new BearerStrategy((accessToken, done) => {
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
passport.use('tokenBearer', new BearerStrategy(async (token, done) => {
  const tokenService = new TokenService(Sequelize.Credentials, getActiveLogger());
  try {
    const projectId = await tokenService.getProjectIdByToken(token);
    if (projectId) {
      return done(null, { projectId }, { scope: '*' });
    }

    return done(null, false);
  } catch (error) {
    return done(null, false);
  }
}));


exports.endorAuthenticate = passport.authenticate('endorBearer', { session: false });
exports.tokenAuthenticate = passport.authenticate('tokenBearer', { session: false });
