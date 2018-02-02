import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import * as heartbeats from './routes/heatbeat.routes';
import * as index from './routes/index.routes';

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

app.listen(3001, () => console.log('koma listening on port 3001'));

