---
title: "Node.js"
---
This guide explains how to use the SecurePacks Node.js Buildpack to build applications for various common use-cases. 

 
 
### Build a Sample Nodejs Application
 
To create a sample app locally using this buildpack through the pack CLI, follow these steps:
 
```shell
git clone https://github.com/initializ-buildpacks/samples
```
```
cd samples/nodejs/npm
```
```
pack build my-app --buildpack initializ-buildpacks/nodejs \
  --builder initializbuildpacks/securepacks
```
 
Check out the Readme in folder for instructions on running the app.
```
docker run --interactive --tty --init --publish 8080:8080 my-app
``` 
### Install a Specific Node Engine Version
 
You can specify a version of Node.js for deployment using various methods:
 
### Using `BP_NODE_VERSION` Environment Variable
 
To set Node.js v19.9.0 during app deployment, use the following command :
 
```bash
pack build my-app \
--buildpack initializ-buildpacks/nodejs \
--env BP_NODE_VERSION="19.9.0" \
--builder initializbuildpacks/securepacks
```
Or you can specify the node version by using project.toml file in the root of you application directory :
```
# project.toml

BP_NODE_VERSION="19.9.0"
```
 
### Using `package.json`
 
If your apps use npm or yarn, you can specify the Node.js version your apps use during deployment by configuring the engines field in the package.json file
 
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
  --buildpack initializ-buildpacks/nodejs \
  --env BP_NODE_OPTIMIZE_MEMORY=true \
  --builder initializbuildpacks/securepacks
``` 
### Build an App From Source in a Subdirectory
 
To specify a subdirectory to be used as the root of the app, please use the BP_NODE_PROJECT_PATH environment variable at build time either directly or through a project.toml(opens in a new tab). This could be useful if your app is a part of a monorepo.
 
```bash
BP_NODE_PROJECT_PATH=node-app
```
 
### Run Scripts During Build Phase
Here's how this can come in handy: Suppose your application relies on a framework such as Angular, React, or Vue. In such cases, you often find yourself running scripts to transform your application into a production-ready state. 
For example, if your application's package.json contians following scripts:
```
{
  "scripts": { 
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "lint": "eslint src/**/*.js src/**/*.jsx",
  }
}
```
Execute scripts during the build phase using the `BP_NODE_RUN_SCRIPTS` environment variable.
 
```bash
BP_NODE_RUN_SCRIPTS=lint,build
``` 
the lint and then build scripts would be run via npm or yarn, during build phase.

### Build Angular apps on stacks with read-only file systems
By default, when an Angular app initializes, it tries to create a cache directory, `.angular/cache`, within the app’s directory. On some environments, such as the Paketo Jammy stacks, the app directory is read-only at runtime. Consequently, Angular apps may fail to start and produce errors like `Error: EACCES: permission denied, open '/workspace/.angular/cache`.

To prevent this issue, configure Angular to create the cache in a writable location, such as `/tmp`.
 
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
pack build my-app \ 
 --buildpack initializ-buildpacks/nginx \
 --env BP_NODE_RUN_SCRIPTS=build \
 --env BP_WEB_SERVER=nginx \
 --env BP_WEB_SERVER_ROOT=build \
 --builder initializbuilpacks/securepacks
```
 
### Enable Process Reloading
 
Enable restarting the server process when files change using the `BP_LIVE_RELOAD_ENABLED` environment variable.
 
```bash
pack build myapp --buildpack initializ-buildpacks/nginx --env BP_LIVE_RELOAD_ENABLED=true --builder initializbuilpacks/securepacks
```    
### Enable DEBUG logging
 
Access extra debug logs during the image build process by setting the `BP_LOG_LEVEL` environment variable to DEBUG at build time.
```bash
pack build my-app --buildpack initializ-buildpacks/nodejs --env BP_LOG_LEVEL=DEBUG --builder initializbuilpacks/securepacks
```
