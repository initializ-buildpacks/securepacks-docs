# PHP
PHP detection is initiated upon encountering either of the following files:

 - index.php
 - composer.json

## Analysis & Detection
Make sure that any of the file from above is present so that the detection and analysis from the buildpack passes successfully.
![CreateApp](../assets/php/detect.png)

## Setup
After running the detection the buildpack will setup the required version of go to be installed.
![CreateApp](../assets/php/setup.png)

- The following Python versions are available

  - 8.0
  - 8.1
  - 8.2 (Default)
  - 8.3

  ## Build
The build will start and the builder will install and setup the dependencies and packages required to create and run the application.
![CreateApp](../assets/php/build.png)

## Export & Caching
This is the final stage of the build process.
The builder will export and cache the reference of the application.
After caching the image is built and you can now run the application.
![CreateApp](../assets/php/export.png)

## Run the app
You should be able to run the application now, if you have any port you can do port mapping.
By default it will run in the production environment.
![CreateApp](../assets/php/run.png)

These directories are cached between builds.