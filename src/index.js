import express from 'express';
import firebase from 'firebase-admin';
import config from 'config';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import * as heartbeats from './routes/heatbeat.routes';
import * as index from './routes/index.routes';
import FirebaseService from './services/firebase.service';
import HeartbeatService from './services/heartbeats.service';

// setup firebase
const serviceAccount = config.get('firebase.serviceAccount');
const databaseURL = config.get('firebase.databaseUrl');
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL
});


// dependency injections
const firebaseService = new FirebaseService(firebase);
const heartbeatSerivce = new HeartbeatService(firebaseService);
heartbeats.setDependencies(heartbeatSerivce);
// end dependency injections

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', express.static('docs'));
app.use('/api', [index.router]);
app.use('/api/v1', [heartbeats.router]);

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


app.listen(3001, () => console.log('koma listening on port 3001'));

