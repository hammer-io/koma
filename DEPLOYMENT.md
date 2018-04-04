# Deploying the Application

## Steps Overview

1. VM Setup (Ubuntu 16.04)
   - This should already have been done in the [Endor deployment setup](https://github.com/hammer-io/endor/blob/master/DEPLOYMENT.md)
2. Firebase Setup
   - Please read the [Firebase Setup](https://github.com/hammer-io/koma/blob/master/README.md#getting-started-for-development)
     step in the README.md document.
3. Project Setup
   1. Navigate to where you want the project, then clone it:
      - `git clone git@github.com:hammer-io/koma.git`
      - (This works via SSH only if you setup a deploy key.)
   2. Install dependencies: `cd koma && npm install`
      - NOTE: If the `NODE_ENV` environment variable is already set to "production",
        you need to first unset it (`unset NODE_ENV`) before running `npm install`
        so the dev dependencies are installed (to use babel-cli mainly).
   3. Create production configuration file:
      - From the koma directory, move to the config directory and copy the default-example config file: `cd config && cp default-example.json production.json`
      - Edit `production.json` and enter valid information
      - **Make sure to set the following:**
        - The database host should be set to "dockerhost"
        - The database options should include the following: `"dialectOptions": { "socketPath": "/tmp/mysql.sock" },`
   4. Create and initialize the database:
      - First, run `export NODE_ENV=production` to ensure it uses the production configs
      - Create the database: `npm run createDB`
      - Initialize: `npm run initDB`
4. Setting up docker-gen and Nginx reverse proxy
   - This should already have been done in the [Endor deployment setup](https://github.com/hammer-io/endor/blob/master/DEPLOYMENT.md)
5. Build and run the `hammerio/koma` image

```bash
# Building the image (-t gives a tag name)
docker build -t hammerio/koma .
# Run the image on the defined virtual host with the host mysql socket mounted in the container.
# Replace "example.com" with the actual domain name you want for the reverse proxy.
docker run --add-host=dockerhost:$(ip route | awk '/docker0/ { print $NF }') \
  -v /var/run/mysqld/mysqld.sock:/tmp/mysql.sock \
  -e NODE_ENV=production \
  -e VIRTUAL_HOST=example.com \
  -d hammerio/koma
# For easier debugging, add the -it option to keep an interactive shell open
```

## Helpful Docker Commands

For the actual docker commands used in deployment, [read above](#steps-overview).

A [docker](https://www.docker.com) image is built to run the application in
production. The following commands will help you deploy Koma in a docker
container on your local machine (for development, normally you don't need
to do this; just run `npm start`):

```bash
# Building the image (-t gives a tag name)
docker build -t hammerio/koma .
# List docker images
docker images
# Runs the image, redirecting port 8888 on your machine to
# the exposed port in the image. The -d flag detaches the process. 
docker run -p 8888:3001 -d hammerio/koma
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
