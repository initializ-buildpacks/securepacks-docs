# NodeJs
Open the directory of the nodejs application where the source code is present.

## Environment Variables
Upon deployment, the Node provider configures the following environment variables:

  - NODE_ENV=production
  - NPM_CONFIG_PRODUCTION=false:This setting guarantees the installation of development dependencies, ensuring comprehensive development support.

## Analysis & Detection
Make sure that the package.json file is present so that the detection and analysis from the buildpack passes successfully. 
![CreateApp](../assets/nodejs/detect.png)

## Setup
After running the detection the buildpack will setup the required version of go to be installed.
![CreateApp](../assets/nodejs/setup.png)

- The following major versions are available

  - 14
  - 16
  - 18 (Default)
  - 20

## Build
The build will start and the builder will install and setup the dependencies and packages required to create and run the application.
![CreateApp](../assets/nodejs/build.png)

## Export & Caching
This is the final stage of the build process.
The builder will export and cache the reference of the application.
After caching the image is built and you can now run the application.
![CreateApp](../assets/nodejs/export.png)

## Run the app
You should be able to run the application now, if you have any port you can do port mapping.
By default it will run in the production environment.
![CreateApp](../assets/nodejs/run.png)

These directories are cached between builds.
