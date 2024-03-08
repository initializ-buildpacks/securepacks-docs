# Python
Python detection occurs when any of the following files are located within the project directory:

 - requirements.txt
 - main.py
 - pyproject.toml
 - Pipfile

## Analysis & Detection
Make sure that any of the file from above is present so that the detection and analysis from the buildpack passes successfully.
![CreateApp](../assets/python/detect.png)

## Setup
After running the detection the buildpack will setup the required version of go to be installed.
![CreateApp](../assets/python/setup.png)

- The following Python versions are available

  - 3.11
  - 3.10
  - 3.9
  - 3.8 (Default)
  - 3.7
  - 2.7

## Build
The build will start and the builder will install and setup the dependencies and packages required to create and run the application.
![CreateApp](../assets/python/build.png)

## Export & Caching
This is the final stage of the build process.
The builder will export and cache the reference of the application.
After caching the image is built and you can now run the application.
![CreateApp](../assets/python/export.png)

## Run the app
You should be able to run the application now, if you have any port you can do port mapping.
By default it will run in the production environment.
![CreateApp](../assets/python/run.png)

These directories are cached between builds.