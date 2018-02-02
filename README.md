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


## Generating Documenation
We use [apidoc.js](http://apidocjs.com/) for API Documenation. 

To generate documentation, run the command `apidoc -i src/ -o docs/`. This command will 
generate all documentation for files underneath the `src/` directory and generate the documentation
 in the `docs/` folder.  The `npm build` command will also generate the documentation.

## Docker Deployment

A [docker](https://www.docker.com) image is built to run the application in
production. The following commands will help you deploy koma in a docker
container on your local machine (for development, normally you don't need
to do this; just run `npm start`):

```bash
# Building the image (-t gives a tag name)
docker build -t hammerio/koma .
# List docker images
docker images
# Runs the image, redirecting port 8888 on your machine to
# the exposed port in the image 
docker run -p 8888:3001 hammerio/koma
# For production, we change the port and add -d flag to detach
# the process
docker run -p 80:3001 -d hammerio/koma
# Get container ID
docker ps
# Print app output
docker logs <container_id>
# Enter the container, if necessary
docker exec -it <container_id> /bin/sh
# Stop the container
docker stop <container_id>
```

Most of this information was found in
[this guide from nodejs.org](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/). 
