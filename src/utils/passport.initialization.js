import config from 'config';
import passport from 'passport';
import BearerStrategy from 'passport-http-bearer';

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
