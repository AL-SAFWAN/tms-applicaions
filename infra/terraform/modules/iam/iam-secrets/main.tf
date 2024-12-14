data "aws_iam_policy_document" "myapp_secrets" {
  statement {
    actions = ["sts:AssumeRoleWithWebIdentity"]
    effect  = "Allow"

    condition {
      test     = "StringEquals"
      variable = "${replace(var.federated_identity_url, "https://", "")}:sub"
      values   = ["system:serviceaccount:kube-system:${var.service_account_name}"]
    }

    principals {
      identifiers = [var.federated_identity_arn]
      type        = "Federated"
    }
  }
}

resource "aws_iam_role" "myapp_secrets" {
  name               = "${var.cluster_name}-myapp-secrets"
  assume_role_policy = data.aws_iam_policy_document.myapp_secrets.json

  tags = {
    Environment = var.environment
    Name        = "${var.cluster_name}-myapp-secrets"
  }
}

resource "aws_iam_policy" "myapp_secrets" {
  name = "${var.cluster_name}-myapp-secrets"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect   = "Allow"
        Action   = var.secret_actions
        Resource = var.secret_arn
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "myapp_secrets" {
  policy_arn = aws_iam_policy.myapp_secrets.arn
  role       = aws_iam_role.myapp_secrets.name
}
