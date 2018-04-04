# koma
Service to accept heartbeat and data information and store it

[![Build Status](https://travis-ci.org/hammer-io/koma.svg?branch=master)](https://travis-ci.org/hammer-io/koma)
[![codecov](https://codecov.io/gh/hammer-io/koma/branch/master/graph/badge.svg)](https://codecov.io/gh/hammer-io/koma)

## Getting Started For Development
1. Fork the repository
2. Run `git clone https://github.com/<username>/koma` to clone the repository
3. Run `cd koma`, then `npm install`
4. Setup your Firebase database
   - Create a Firebase project with Realtime Database
   - In the Realtime Database panel, add a new key-value pair `"Test": "Test"`. You can
     remove this later after the database is populated with some actual data. If you don't add
     some initial data, the database won't be saved and you'll have to create another new one.
   - Edit the Realtime Database rules, replacing with the contents of `firebase-rules.json`
   - In the `Authentication -> Sign-in Method` panel, enable the Email/Password provider
     and configure any authorized domains
5. [Setup configurations](#Configuration-for-Development)
6. Initialize your MySql database by running `npm run initTestDB`

## Configuration for Development
1. Copy `default-example.json` file to `default.json`. 
2. Replace `firebase.databaseUrl` with the URL to your Firebase database. 
3. Replace `firebase.serviceAccount` with the Service Account which is downloaded in Firebase 
   underneath `Project Settings -> Service Accounts -> Firebase Admin SDK -> Generate New Private Key`

## Generating Documenation
We use [apidoc.js](http://apidocjs.com/) for API Documenation. 

To generate documentation, run the command `apidoc -i src/ -o docs/`. This command will 
generate all documentation for files underneath the `src/` directory and generate the documentation
in the `docs/` folder.  The `npm build` command will also generate the documentation.

## Docker Deployment

For deployment instructions, please see the
[DEPLOYMENT.md](https://github.com/hammer-io/koma/blob/master/DEPLOYMENT.md) document.
