variable "environment" {
  type = string
}

variable "eks_name" {
  type = string
}

variable "cluster_name" {
  type = string
}

variable "manager_username" {
  type    = string
  default = "manager"
}

variable "admin_groups" {
  type    = list(string)
  default = ["my-admin"] # defined in the rbac.tf file
}
