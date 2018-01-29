# skadi
Service to accept heartbeat and data information and store it

[![Build Status](https://travis-ci.org/hammer-io/skadi.svg?branch=master)](https://travis-ci.org/hammer-io/skadi)
[![codecov](https://codecov.io/gh/hammer-io/skadi/branch/master/graph/badge.svg)](https://codecov.io/gh/hammer-io/skadi)

## Getting Started For Development
1. Fork the repository
2. Run `git clone https://github.com/<username>/skadi` to clone the repository
3. Run `cd sakdi`, then `npm install`
4. Setup your Firebase database
5. Setup configurations for firebase database
* Create a `firebaseConfig.json` with the following: 
```json
{
  "databaseUrl": "<firebase url>"
}
```
* Create a `serviceAccountKey.json` file which can be downloaded from firebase by going into your new firebase 
application settings -> Firebase Admin SDK -> Generate New Private Key. Rename the file to `serviceAccountKey.json` and 
put it in the top-level folder.
