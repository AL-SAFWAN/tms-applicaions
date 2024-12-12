# Purpose: Create the EKS node group for the EKS cluster to run the application workloads.
resource "aws_iam_role" "nodes" {
  name = "${local.environment}-${local.eks_name}-eks-nodes"

  assume_role_policy = <<POLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "ec2.amazonaws.com"
      }
    }
  ]
}
POLICY
}

# Attach policies to the node role to allow the nodes to join the EKS cluster and access other AWS services like ECR and CloudWatch logs for logging.

resource "aws_iam_role_policy_attachment" "amazon_eks_worker_node_policy" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSWorkerNodePolicy"
  role       = aws_iam_role.nodes.name
}

resource "aws_iam_role_policy_attachment" "amazon_eks_cni_policy" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEKS_CNI_Policy"
  role       = aws_iam_role.nodes.name
}

# [TODO] remove since I'll be using docker hub
# Attach a policy to the node role to allow the nodes to read from the ECR repository.
resource "aws_iam_role_policy_attachment" "amazon_ec2_container_registry_read_only" {
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly"
  role       = aws_iam_role.nodes.name
}


resource "aws_eks_node_group" "general" {
  cluster_name    = aws_eks_cluster.eks.name
  version         = local.eks_version
  node_group_name = "general"
  node_role_arn   = aws_iam_role.nodes.arn

  # The node group will be placed in the private subnets.
  subnet_ids = [
    aws_subnet.private_zone_1.id,
    aws_subnet.private_zone_2.id
  ]

  capacity_type  = "ON_DEMAND"
  # Create the EKS managed node group with the smallest instance type to save costs.
  instance_types = ["t3.large"]

  scaling_config {
    desired_size = 1 # start with 1 instance
    max_size     = 10 # max size of 2 instances
    min_size     = 0
  }

  # The node group will have an update configuration to allow one instance to be unavailable during updates.
  update_config {
    max_unavailable = 1
  }

  # The node group will have a label to identify the role of the nodes.
  labels = {
    role = "general"
  }


  # The node group will depend on the IAM role and policies created earlier.
  depends_on = [
    aws_iam_role_policy_attachment.amazon_eks_worker_node_policy,
    aws_iam_role_policy_attachment.amazon_eks_cni_policy,
    aws_iam_role_policy_attachment.amazon_ec2_container_registry_read_only,
  ]

  # Cluster autoscaler will manage the desired size of the node group
  # This will conflict with Terraform's desired size
  # Allow external changes without Terraform plan difference
  lifecycle {
    ignore_changes = [scaling_config[0].desired_size]
  }
}
