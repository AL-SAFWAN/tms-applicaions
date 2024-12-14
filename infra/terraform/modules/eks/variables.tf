variable "environment" {
  type = string
}

variable "eks_name" {
  type = string
}

variable "eks_version" {
  type = string
}

# A list of private subnet IDs where the cluster and node groups will be placed.
variable "private_subnets" {
  type = list(string)
}

variable "node_group_instance_types" {
  type    = list(string)
  default = ["t3.large"]
}

variable "node_group_desired_size" {
  type    = number
  default = 1
}

variable "node_group_min_size" {
  type    = number
  default = 0
}

variable "node_group_max_size" {
  type    = number
  default = 10
}
