variable "environment" {
  type = string
}

variable "cluster_name" {
  type = string
}

variable "developer_username" {
  type    = string
  default = "developer"
}

variable "developer_groups" {
  type    = list(string)
  default = ["my-viewer"]
}

# EKS actions allowed for the developer
variable "developer_eks_actions" {
  type = list(string)
  default = [
    "eks:DescribeCluster",
    "eks:ListClusters",
    "eks:AccessKubernetesApi"
  ]
}
