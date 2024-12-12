terraform {
    backend "s3" {
        bucket         = "tf-state-aws-backend-2056"
        key            = "terraform/aws-backend/terraform.tfstate"
        region         = "eu-west-2"
        dynamodb_table = "terraform-state-locking"
        encrypt        = true
    }
    required_providers {
        aws = {
        source  = "hashicorp/aws"
        version = "~> 5.53"
        }
        kubernetes = {
            source  = "hashicorp/kubernetes"
            version = "~> 2.23"
        }
        helm = {
            source  = "hashicorp/helm"
            version = "~> 2.10"
        }
    }
}

provider "aws" {
  region = local.region
}

data "aws_eks_cluster" "eks" {
  name = aws_eks_cluster.eks.name
}

data "aws_eks_cluster_auth" "eks" {
  name = aws_eks_cluster.eks.name
}

provider "kubernetes" {
  host                   = data.aws_eks_cluster.eks.endpoint
  cluster_ca_certificate = base64decode(data.aws_eks_cluster.eks.certificate_authority[0].data)
  token                  = data.aws_eks_cluster_auth.eks.token
}

provider "helm" {
  kubernetes {
    host                   = data.aws_eks_cluster.eks.endpoint
    cluster_ca_certificate = base64decode(data.aws_eks_cluster.eks.certificate_authority[0].data)
    token                  = data.aws_eks_cluster_auth.eks.token
  }
}
