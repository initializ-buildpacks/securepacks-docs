### Enhancing Supply Chain Visibility with SBOM 
import Link from '/src/components/Linking.tsx';


In the intricate web of software supply chains, visibility is paramount to ensuring security and compliance. Enter Software Bill of Materials (SBOM), a foundational component of containerization workflows, illuminating the provenance and composition of container images. 

SBOM provides a comprehensive inventory of software components and their dependencies, facilitating transparency and traceability throughout the software supply chain. By cataloging this information, organizations gain insights into potential vulnerabilities and licensing obligations, mitigating risks and ensuring regulatory compliance. 

Furthermore, SBOM integrates seamlessly with tools like Grype, enabling automated vulnerability analysis and risk assessment. This synergy empowers organizations to proactively address security concerns and maintain the integrity of their containerized applications. 

In essence, SBOM serves as a cornerstone of trust in containerization, empowering organizations to navigate the complexities of software supply chains with confidence and clarity. 

SBOM integrates with <Link/> and Syft, enabling automated vulnerability analysis. Syft, an open-source tool by Anchore, offers deep inspection of container images, empowering organizations to proactively address security issues.

### What software bill of materials contains?
A Software Bill of Materials (SBOM) is an industry-standard method for exposing metadata about dependencies within images or applications. This metadata includes various fields such as:

 - `version` : the dependency version
 - `uri` : URI to compiled dependency
 - `checksum` : a CycloneDX-supported hash algorithm (such as SHA-256) and value of the dependency
 - `licenses` : dependency licenses in SPDX format
 - `deprecation-date` : dependency deprecation date
 - `source uri` : URI to upstream source dependency
 - `source checksum` : a CycloneDX-supported hash algorithm and value of the upstream source dependency
 - `CPE` : common platform enumeration
 - `pURL` : package URL

 ### What are the output formats of a Securepacks SBOM?
 Securepacks support several SBOM formats:
 - [SPDX JSON](https://spdx.dev/)
 - [CycloneDX JSON](https://cyclonedx.org/)

 ### Where are SBOMs stored?
you can access the generated SBOM at layers directory :
```
cat /layers/sbom/launch/sbom.legacy.json
```
#### Example Json SBOM 
```
[
  {
    "name": "helper",
    "metadata": {
      "layer": "helper",
      "names": ["ca-certificates-helper"],
      "version": "3.6.15"
    },
    "buildpack": {
      "id": "initializ-buildpacks/ca-certificates",
      "version": "3.6.15"
    }
  },
  {
    "name": "Node Engine",
    "metadata": {
      "checksum": {
        "algorithm": "SHA-256",
        "hash": "a58d5d99b4ccf95d966dd1e3d3a560f4686e3e1e4f7331258860d429f13fc7eb"
      },
      "cpe": "cpe:2.3:a:nodejs:node.js:20.13.0:*:*:*:*:*:*:*",
      "deprecation-date": "2026-04-30T00:00:00Z",
      "licenses": [
        "0BSD",
        "Apache-2.0",
        "Artistic-2.0",
        "BSD-2-Clause",
        "BSD-3-Clause",
        "BSD-4-Clause",
        "BSD-Source-Code",
        "CC0-1.0",
        "ECL-2.0",
        "ICU",
        "MIT",
        "MIT-0",
        "SHL-0.5",
        "SHL-0.51",
        "Unicode-TOU"
      ],
      "purl": "pkg:generic/node@v20.13.0?checksum=a58d5d99b4ccf95d966dd1e3d3a560f4686e3e1e4f7331258860d429f13fc7eb&download_url=https://nodejs.org/dist/v20.13.0/node-v20.13.0-linux-x64.tar.xz",
      "source": {
        "checksum": {
          "algorithm": "SHA-256",
          "hash": "a58d5d99b4ccf95d966dd1e3d3a560f4686e3e1e4f7331258860d429f13fc7eb"
        },
        "uri": "https://nodejs.org/dist/v20.13.0/node-v20.13.0-linux-x64.tar.xz"
      },
      "uri": "https://nodejs.org/dist/v20.13.0/node-v20.13.0-linux-x64.tar.xz",
      "version": "20.13.0"
    },
    "buildpack": {
      "id": "initializ-buildpacks/node-engine",
      "version": "3.5.5"
    }
  }
]
```




Read more about [Software Bill of Materials](https://www.cisa.gov/sbom)