---
title: "Node.js"
---

 
### Build a Sample Nodejs Application
 
To create a sample app locally using this buildpack through the pack CLI, follow these steps:
 
```shell
git clone https://github.com/initializ-buildpacks/samples
cd samples/nodejs/npm
pack build my-app --buildpack initializbuildpacks/nodejs \
  --builder initializbuildpacks/securepacks-initzbuilder:latest
```
 
Check out the Readme in folder for instructions on running the app.
```
docker run --interactive --tty --init --publish 8080:8080 npm-sample
``` 
### Install a Specific Node Engine Version
 
You can specify a version of Node.js for deployment using various methods:
 
### Using `BP_NODE_VERSION` Environment Variable
 
To set Node.js v19.9.0 during app deployment, use the following command or a `project.toml` file:
 
```bash
BP_NODE_VERSION="19.9.0"
```
 
### Using `package.json`
 
Include the Node.js version in your `package.json` file:
 
```json
{
  "engines": {
    "node": "19.9.0"
  }
}
```
  
### Enable Heap Memory Optimization
 
To optimize memory usage, set the `BP_NODE_OPTIMIZE_MEMORY` environment variable to `true`.
 
```bash
pack build my-app \
  --buildpack initializbuildpacks/nodejs \
  --env BP_NODE_OPTIMIZE_MEMORY=true
``` 
### Build an App From Source in a Subdirectory
 
Specify a subdirectory as the root of the app using the `BP_NODE_PROJECT_PATH` environment variable.
 
```bash
$BP_NODE_PROJECT_PATH=node-app
```
 
### Run Scripts During Build Phase
Here's how this can come in handy: Suppose your application relies on a framework such as Angular, React, or Vue. In such cases, you often find yourself running scripts to transform your application into a production-ready state. 
Execute scripts during the build phase using the `BP_NODE_RUN_SCRIPTS` environment variable.
 
```bash
$BP_NODE_RUN_SCRIPTS=lint,build
``` 
### Build Angular apps on stacks with read-only file systems
 
To configure the location of the Angular cache, adjust the `cli.cache.path` parameter in your app’s `angular.json`.
 
```json
{
  "cli":{
    "cache": {
      "path": "/tmp/.angular/cache"
    }
  }
}
```
 
#### Build an App that Uses NPM
 
The Node.js buildpack automatically detects if an app requires npm.
 
#### Build an App that Uses Yarn
 
The Node.js buildpack automatically detects if an app requires yarn.
 
#### Build an App Without Package Management
 
The Node.js buildpack supports building apps without package management.
 
### Specify A Custom Entrypoint
The Node.js buildpack simplifies app building, auto-detecting entrypoints like server.js, app.js, main.js, or index.js. To customize, set BP_LAUNCHPOINT during build if your file differs. 
Customize the entrypoint file using the `BP_LAUNCHPOINT` environment variable.
 
```bash
BP_LAUNCHPOINT="./src/launchpoint.js"
```
 
### Build and Serve a Frontend Framework App
 
Utilize the  Nginx Server Securepack to build static assets and configure a web server for frameworks like React, Vue, Angular.

```bash
pack build frontend-app --buildpack initializbuildpacks/nginx \
                          --env BP_NODE_RUN_SCRIPTS=build \
                          --env BP_WEB_SERVER=nginx \
                          --env BP_WEB_SERVER_ROOT=build
```
 
### Enable Process Reloading
 
Enable restarting the server process when files change using the `BP_LIVE_RELOAD_ENABLED` environment variable.
 
```bash
pack build myapp --env BP_LIVE_RELOAD_ENABLED=true
```
 
### Install a Custom CA Certificate
 
Provide custom CA certificates(link) to be included in the container root truststore at build-time and runtime.
 
### Override the Start Process Set by the Buildpack
 
Set custom start processes for the app image.
   
### Enable DEBUG logging
 
Access extra debug logs during the image build process by setting the `BP_LOG_LEVEL` environment variable to DEBUG at build time.
```bash
pack build my-app --buildpack paketo-buildpacks/nodejs \
  --env BP_LOG_LEVEL=DEBUG
```
