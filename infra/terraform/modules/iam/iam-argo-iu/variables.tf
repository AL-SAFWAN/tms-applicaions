variable "cluster_name" {
  type = string
  description = "Name of the EKS cluster"
}

variable "namespace" {
  type = string
  default = "argocd"
  description = "The namespace where argocd-image-updater is deployed"
}

variable "service_account_name" {
  type = string
  default = "argocd-image-updater"
  description = "The name of the service account for argocd-image-updater"
}

variable "tags" {
  type = map(string)
  default = {}
  description = "Tags to apply to resources"
}
