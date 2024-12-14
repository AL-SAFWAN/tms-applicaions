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

variable "service_account_name" {
  type = string
  # K8s service account name
}

variable "secret_actions" {
  type    = list(string)
  default = ["secretsmanager:GetSecretValue", "secretsmanager:DescribeSecret"]
  # Secret access actions
}

variable "secret_arn" {
  type      = string
  default   = "*"
  # Target secret ARN
}
