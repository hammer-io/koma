/* eslint-disable import/prefer-default-export */
import express from 'express';
import packageJson from '../../package.json';

export const router = express.Router();

router.get('/', (req, res) => {
  res.send({
    name: packageJson.name,
    version: packageJson.version,
    documentation_url: `http://${req.get('host')}`
  });
});

router.get('/v1', (req, res) => {
  res.send({
    name: packageJson.name,
    version: packageJson.version,
    heartbeats: `http://${req.get('host')}/api/v1/heartbeats`,
    documentation_url: `http://${req.get('host')}`
  });
});
