# Terraform for Solar System on EKS

This folder provisions the AWS infrastructure required for the project:

- VPC
- Public and private subnets
- EKS cluster
- Managed node group
- ECR repository

## Files

- `versions.tf`: Terraform and provider versions
- `main.tf`: main AWS resources
- `variables.tf`: configurable values
- `outputs.tf`: useful Terraform outputs
- `terraform.tfvars.example`: example input values

## Usage

1. Copy:
   `terraform.tfvars.example` to `terraform.tfvars`
2. Update values as needed
3. Run:
   `terraform init`
4. Run:
   `terraform plan`
5. Run:
   `terraform apply`

## Important Outputs

- `cluster_name`
- `cluster_endpoint`
- `ecr_repository_url`

Use these values in GitHub Secrets so the workflow can deploy the app automatically.
