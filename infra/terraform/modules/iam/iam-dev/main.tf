resource "aws_iam_user" "developer" {
  name = var.developer_username

  tags = {
    Environment = var.environment
    Name        = var.developer_username
  }
}

resource "aws_iam_policy" "developer_eks" {
  name = "AmazonEKSDeveloperPolicy"

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Effect   = "Allow",
        Action   = var.developer_eks_actions,
        Resource = "*"
      }
    ]
  })
}

resource "aws_iam_user_policy_attachment" "developer_eks" {
  user       = aws_iam_user.developer.name
  policy_arn = aws_iam_policy.developer_eks.arn
}

resource "aws_eks_access_entry" "developer" {
  cluster_name      = var.cluster_name
  principal_arn     = aws_iam_user.developer.arn
  kubernetes_groups = var.developer_groups
}
