# DotNet
dotnet detection is initiated upon encountering any **.csproj** files are found.

## Analysis & Detection
Make sure that the above file is present so that the detection and analysis from the buildpack passes successfully.
![CreateApp](../assets/dotnet/detect.png)

## Setup
After running the detection the buildpack will setup the required version of go to be installed.
![CreateApp](../assets/dotnet/setup.png)

## Build
The build will start and the builder will install and setup the dependencies and packages required to create and run the application.
![CreateApp](../assets/dotnet/build.png)

## Export & Caching
This is the final stage of the build process.
The builder will export and cache the reference of the application.
After caching the image is built and you can now run the application.
![CreateApp](../assets/dotnet/export.png)

## Run the app
You should be able to run the application now, if you have any port you can do port mapping.
By default it will run in the production environment.
![CreateApp](../assets/dotnet/run.png)

These directories are cached between builds.