---
title: "How to Use"
description: "this is hello"

---
How to Use
=======================
### Getting Started with Securepacks 

Welcome aboard! Securepacks empowers you to effortlessly craft fully operational app images from your source code using our Builder, the pack CLI, and Docker. Let's embark on this journey together. 


### Installation

To kickstart your journey, ensure you have Docker and the pack CLI tool installed on your system. Follow the simple steps below to get set up:

1. **Docker Installation**: Install [Docker](https://docs.docker.com/engine/install/) by following this guide.
 
2. **pack CLI Installation**: Install the [pack](https://buildpacks.io/docs/for-platform-operators/how-to/integrate-ci/pack/) CLI tool with our easy-to-follow guide 




### Let's Begin 

Before diving in, let's ensure you understand the fundamentals of Securepacks and their mechanics. Now, let's witness everything in action using pack build. 

Execute the following commands in your shell to clone and build a simple go app: 

1.  Clone the samples repository: 

```
git clone https://github.com/initializ-buildpacks/samples
```

2. Navigate to the go apps sub-directory: 
```
cd samples/go
```

3. Choose any sample go application: 
```
cd <GO APPLICATION DIRECTORY NAME>
```

4. Build the app using pack: 

```
pack build my-app --builder initializbuildpacks/securepacks

```


Note: The first build might take longer than usual due to initialization. Subsequent builds will leverage caching. 

Congratulations! You now have a runnable app image named myapp available on your local Docker daemon. 

### Testing Your Image 

To locally test your new app image, run it with Docker: 




<!--END_DOCUSAURUS_CODE_TABS-->
```
docker run -it -p 8080:8080 my-app
```

You should see the following output: 

```
"Initializ-Securepacks"
```
## LET'S TRY


<details>
  <summary>make your first securepack OCI</summary>

Visit
 here [`Build Go/Nodejs OCI from securpack`](https://github.com/initializ-buildpacks/samples/actions/workflows/try-securepack.yml)

  and provide appropiate details.

  After completion of job,you can pull your image , and use it further
```
docker pull naveen871/< Desired name for the Docker image > 
```
</details>

## test



###  Taking it Further 

With pack, you can effortlessly craft OCI images that are runnable nearly anywhere. Feel free to deploy your newfound image to your preferred cloud platform! 

Let's build something great together with Securepacks. Happy coding! 🚀 