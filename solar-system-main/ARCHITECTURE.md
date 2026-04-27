# Solar System Deployment Architecture

This project is now organized to match a practical version of the architecture shown in your screenshots.

## Target flow

1. Developers push code to `develop` or `main`.
2. GitHub Actions runs tests and coverage.
3. A Docker image is built and pushed to `ghcr.io`.
4. The Kubernetes manifests are rendered with environment values.
5. `develop` deploys to `staging`.
6. `main` deploys to `production`.

## Suggested AWS mapping

- `Route53`: public DNS for the application domain.
- `WAF`: protects the public endpoint.
- `CloudFront`: optional caching layer in front of the app.
- `ALB / Ingress Controller`: receives HTTPS traffic and routes it to Kubernetes services.
- `EKS`: runs the `solar-system` pods in multiple availability zones.
- `MongoDB Atlas` or `DocumentDB`: database layer used by the Node.js app.
- `GitHub Actions`: CI/CD pipeline for test, build, and deployment.
- `GHCR` or `ECR`: container registry for application images.

## Repository structure

- `.github/workflows/ci-cd.yml`: CI/CD pipeline.
- `kubernetes/development`: manifests for dev deployments.
- `kubernetes/staging`: manifests for staging deployments.
- `kubernetes/production`: manifests for production deployments.

## Required GitHub secrets

- `STAGING_KUBECONFIG`: base64 encoded kubeconfig for the staging cluster.
- `PRODUCTION_KUBECONFIG`: base64 encoded kubeconfig for the production cluster.
- `STAGING_INGRESS_IP`: public ingress IP or DNS helper suffix for staging.
- `PRODUCTION_INGRESS_IP`: public ingress IP or DNS helper suffix for production.

## MongoDB secret in Kubernetes

Create this secret in each namespace:

```bash
kubectl create secret generic mongo-db-creds \
  --from-literal=MONGO_URI='your-mongo-uri' \
  --from-literal=MONGO_USERNAME='your-user' \
  --from-literal=MONGO_PASSWORD='your-password' \
  -n staging
```

Repeat the same command for `production`.
