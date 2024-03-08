# GoLang
 
 Open the directory of the golang application where the source code is present.

## Analysis & Detection
Make sure that the go.mod file is present so that the detection and analysis from the buildpack passes successfully. 
![CreateApp](../assets/golang/golang_detect.png)

## Setup
After running the detection the buildpack will setup the required version of go to be installed.
![CreateApp](../assets/golang/golang_setup.png)

- The following Go versions are available:

  - 1.18
  - 1.19
  - 1.20
  - 1.21 (default)

- The version is parsed from the `go.mod` file.


## Build
The build will start and the builder will install and setup the dependencies and packages required to create and run the application.
![CreateApp](../assets/golang/golang_build.png)


## Export & Caching
This is the final stage of the build process.
The builder will export and cache the reference of the application.
After caching the image is built and you can now run the application.
![CreateApp](../assets/golang/Export.png)

## Run the app
You should be able to run the application now, if you have any port you can do port mapping.
By default it will run in the production environment.
![CreateApp](../assets/golang/Run1.png)


These directories are cached between builds.