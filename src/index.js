import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import helmet from 'helmet';
import passport from 'passport';
import skadi from 'skadi-hammerio';

import * as tokens from './routes/tokens.routes';
import * as heartbeats from './routes/heatbeat.routes';
import * as osdata from './routes/osdata.routes';
import * as httpdata from './routes/httpdata.routes';
import * as index from './routes/index.routes';
import * as firebase from './utils/firebase';
import sequelize from './db/sequelize';
import FirebaseService from './services/firebase.service';
import HeartbeatService from './services/heartbeats.service';
import OSDataService from './services/osdata.service';
import TokenService from './services/token.service';
import HTTPDataService from './services/httpdata.service';
import { getActiveLogger } from './utils/winston';


// setup firebase
firebase.init();

// database setup
sequelize.initSequelize();

// Run Skadi for data monitoring
skadi.heartbeat();
skadi.osdata();

// dependency injections
const firebaseService = new FirebaseService(firebase.instance, getActiveLogger());
const heartbeatService = new HeartbeatService(firebaseService, getActiveLogger());
const osDataService = new OSDataService(firebaseService, getActiveLogger());
const httpDataService = new HTTPDataService(firebaseService, getActiveLogger());
const tokenService = new TokenService(sequelize.Credentials, getActiveLogger());

heartbeats.setDependencies(heartbeatService);
osdata.setDependencies(osDataService);
httpdata.setDependencies(httpDataService);
tokens.setDependencies(tokenService);

// end dependency injections

const app = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(logger('dev'));
app.use(passport.initialize());

app.use('/', express.static('docs'));
app.use('/api', [index.router]);
app.use('/api/v1', [heartbeats.router, tokens.router, osdata.router, httpdata.router]);

app.use((req, res) => {
  res.status(404).send({
    status: 404,
    message: 'Not Found',
    documentation_url: `http://${req.get('host')}`
  });
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
// eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});


module.exports = app.listen(3001, () => console.log('koma listening on port 3001'));
