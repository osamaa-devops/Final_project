# Solar System NodeJS Application

A simple HTML + MongoDB + NodeJS project to display the Solar System and its planets.

## DevOps Deliverables

- Dockerized Node.js application
- Terraform to provision `VPC + EKS + ECR`
- Kubernetes deployment and `LoadBalancer` service for EKS
- GitHub Actions pipeline for test, build, push to ECR, and deploy to EKS
- Fallback data mode so tests and local runs work without a live MongoDB instance

---
## Requirements

For development, you will only need Node.js and NPM installed in your environement.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v8.11.3

    $ npm --version
    6.1.0

---
## Install Dependencies from `package.json`
    $ npm install

## Run Locally

If you only want to test the project locally, you can run it without a live MongoDB connection.

1. Install dependencies:
   `npm install`
2. Start the app:
   `npm start`
3. Open:
   `http://localhost:3000/`

The app uses built-in fallback planet data when `MONGO_URI` is not set.

## Run Unit Testing
    $ npm test

## Run Code Coverage
    $ npm run coverage

## Run Application
    $ npm start

## Access Application on Browser
    http://localhost:3000/

## AWS / EKS Deployment Flow

1. Apply Terraform from [terraform](F:\Final_project\solar-system-main\terraform).
2. Create a GitHub repository and push this project.
3. Add the required GitHub Secrets.
4. Push to `main`.
5. GitHub Actions will:
   test the app, build the image, push to ECR, deploy to EKS, and print the public LoadBalancer URL.

## Required GitHub Secrets

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION`
- `EKS_CLUSTER_NAME`
- `ECR_REPOSITORY`
- `MONGO_URI`
- `MONGO_USERNAME`
- `MONGO_PASSWORD`

## Terraform Files

- [terraform/main.tf](F:\Final_project\solar-system-main\terraform\main.tf)
- [terraform/variables.tf](F:\Final_project\solar-system-main\terraform\variables.tf)
- [terraform/outputs.tf](F:\Final_project\solar-system-main\terraform\outputs.tf)
- [terraform/terraform.tfvars.example](F:\Final_project\solar-system-main\terraform\terraform.tfvars.example)

## Kubernetes Files

- [kubernetes/production/namespace.yaml](F:\Final_project\solar-system-main\kubernetes\production\namespace.yaml)
- [kubernetes/production/deployment.yaml](F:\Final_project\solar-system-main\kubernetes\production\deployment.yaml)
- [kubernetes/production/service.yaml](F:\Final_project\solar-system-main\kubernetes\production\service.yaml)

The production service is exposed as `type: LoadBalancer`, so AWS will create a public endpoint for the app.
