# Namespace for Argo CD
resource "kubernetes_namespace" "argocd" {
  metadata {
    name = "argocd"
    labels = {
      name = "argocd"
    }
  }
}

# Helm Release for Argo CD
resource "helm_release" "argo_cd" {
  name       = "argo-cd"
  namespace  = kubernetes_namespace.argocd.metadata[0].name
  repository = "https://argoproj.github.io/argo-helm"
  chart      = "argo-cd"
  version    = "4.12.2"

  create_namespace = false

#   values = [
#     file("${path.module}/helm/argo-cd/values.yaml")
#   ]

  set {
    name  = "server.service.type"
    value = "LoadBalancer"
  }

  set {
    name  = "configs.cm.application.instanceLabelKey"
    value = "argocd.argoproj.io/instance"
  }

  depends_on = [
    kubernetes_namespace.argocd,
    aws_eks_cluster.eks,
    helm_release.metrics_server,
    helm_release.cluster_autoscaler
  ]
}

# # Optional: Set Argo CD Admin Password
# resource "kubernetes_secret" "argocd_admin_password" {
#   metadata {
#     name      = "argocd-secret"
#     namespace = kubernetes_namespace.argocd.metadata[0].name
#   }

#   data = {
#     "admin.password"      = base64encode("YourSecurePassword")
#     "admin.passwordMtime" = base64encode(timestamp())
#   }

#   depends_on = [helm_release.argo_cd]
# }

# Example Argo CD Application
resource "kubernetes_manifest" "argocd_app" {
  manifest = {
    apiVersion = "argoproj.io/v1alpha1"
    kind       = "Application"
    metadata = {
      name      = "my-app"
      namespace = kubernetes_namespace.argocd.metadata[0].name
    }
    spec = {
      project     = "default"
      source = {
        repoURL        = "https://github.com/your-org/your-repo.git"
        targetRevision = "HEAD"
        path           = "path/to/manifests"
      }
      destination = {
        server    = "https://kubernetes.default.svc"
        namespace = "default"
      }
      syncPolicy = {
        automated = {
          prune     = true
          selfHeal  = true
        }
      }
    }
  }

  depends_on = [helm_release.argo_cd]
}
