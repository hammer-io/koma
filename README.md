# koma
Service to accept heartbeat and data information and store it

[![Build Status](https://travis-ci.org/hammer-io/koma.svg?branch=master)](https://travis-ci.org/hammer-io/koma)

## Getting Started For Development
1. Fork the repository
2. Run `git clone https://github.com/<username>/koma` to clone the repository
3. Run `cd koma`, then `npm install`
4. Setup your Firebase database
5. [Setup configurations](#Configuration-for-Development) for Firebase Database.
6. Remove `config/default-example.json`

## Configuration for Development
1. Copy `default-example.json` file to `default.json`. 
2. Replace `firebase.databaseUrl` with the URL to your Firebase database. 
3. Replace `firebase.serviceAccount` with the Service Account which is downloaded in Firebase 
underneath `settings -> Firebase Admin SDK -> Generate New Private Key`


