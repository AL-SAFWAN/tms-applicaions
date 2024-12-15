variable "environment" {
  type = string
}

variable "cluster_name" {
  type = string
}

variable "federated_identity_arn" {
  type = string
  # OIDC provider ARN
}

variable "federated_identity_url" {
  type = string
  # OIDC provider URL
}

