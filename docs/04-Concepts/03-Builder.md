### Empowering Containerization with Custom Builders 

In the dynamic landscape of containerization, Builders emerge as the architects of bespoke runtime environments, tailored to the unique requirements of applications. 

Builders, leveraging the flexibility of containerization platforms, curate specialized Stacks, comprising runtime dependencies, libraries, and configurations. These custom Stacks serve as the foundation for crafting optimized container images, fine-tuned for performance and security. 

By harnessing Builders, organizations gain granular control over their containerization workflows, optimizing resource utilization and enhancing application resilience. Moreover, custom Stacks enable adherence to Supply-chain Levels for Software Artifacts (SLSA) standards, bolstering trust and compliance. 

In essence, Builders epitomize the art of containerization, empowering organizations to architect tailored solutions that align seamlessly with their business objectives. 

### What builder contains?
A builder is an image that contains three components:
 - a set of `buildpacks`, that provide your app’s dependencies
  - a `stack`, which provides the OS layer for your app image
  - the CNB lifecycle, which puts everything together to produce your final app image

For more information about builders, see [buildpacks.io](https://buildpacks.io/docs/for-app-developers/concepts/builder/).
