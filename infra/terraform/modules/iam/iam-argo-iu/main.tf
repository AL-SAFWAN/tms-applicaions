data "aws_iam_policy_document" "argocd_image_updater" {
  statement {
    effect = "Allow"
    principals {
      type        = "Service"
      identifiers = ["pods.eks.amazonaws.com"]
    }
    actions = [
      "sts:AssumeRole",
      "sts:TagSession"
    ]
  }
}

resource "aws_iam_role" "argocd_image_updater" {
  name = "${var.cluster_name}-argocd-image-updater"
  assume_role_policy = data.aws_iam_policy_document.argocd_image_updater.json
  tags = var.tags
}

resource "aws_iam_role_policy_attachment" "read_only_ecr" {
  role       = aws_iam_role.argocd_image_updater.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly"
}

resource "aws_eks_pod_identity_association" "argocd_image_updater" {
  cluster_name    = var.cluster_name
  namespace       = var.namespace
  service_account = var.service_account_name
  role_arn        = aws_iam_role.argocd_image_updater.arn
}


data "aws_secretsmanager_secret_version" "creds" {
  secret_id = "github" # The name or ARN of your GitHub credentials secret
}

locals {
  github = jsondecode(data.aws_secretsmanager_secret_version.creds.secret_string)
}


resource "kubernetes_secret" "argocd_repo_credentials" {
  metadata {
    name      = "repo-creds"
    namespace = "argocd"
    labels = {
      "argocd.argoproj.io/secret-type" = "repository"
    }
  }

  data = {
    url      = "https://github.com/AL-SAFWAN/tms-applicaions.git"
    username = "AL-SAFWAN"
    password = local.github.token
  }
}

resource "kubernetes_config_map" "argocd_image_updater_config" {
  metadata {
    name      = "argocd-image-updater-config"
    namespace = "argocd"
  }

  data = {
    # Add [skip ci] to the commit message so that CI pipelines are skipped.
    # The template uses Go template syntax. .AppName and .AppChanges are provided by
    # Argo CD Image Updater.
    "git.commit-message-template" = <<-EOT
[skip ci] build: automatic update of {{ .AppName }}

{{ range .AppChanges -}}
Updates image {{ .Image }} from '{{ .OldTag }}' to '{{ .NewTag }}'
{{ end }}
EOT
  }
}
