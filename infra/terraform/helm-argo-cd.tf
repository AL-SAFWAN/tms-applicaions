# Helm Release for Argo CD
resource "helm_release" "argocd" {
  name       = "argocd"
  repository = "https://argoproj.github.io/argo-helm"
  chart      = "argo-cd"
  namespace  = "argocd"
  version    = "7.3.11"

  create_namespace = true

  values = [
    file("${path.module}/../helm/argo-cd/values.yaml")
  ]

  # set {
  #   name  = "server.service.type"
  #   value = "LoadBalancer"
  # }

  # set {
  #   name  = "configs.cm.application.instanceLabelKey"
  #   value = "argocd.argoproj.io/instance"
  # }

  depends_on = [
    aws_eks_node_group.general,
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

# # Example Argo CD Application
# resource "kubernetes_manifest" "argocd_app" {
#   manifest = {
#     apiVersion = "argoproj.io/v1alpha1"
#     kind       = "Application"
#     metadata = {
#       name      = "my-app"
#       namespace = kubernetes_namespace.argocd.metadata[0].name
#     }
#     spec = {
#       project     = "default"
#       source = {
#         repoURL        = "https://github.com/your-org/your-repo.git"
#         targetRevision = "HEAD"
#         path           = "path/to/manifests"
#       }
#       destination = {
#         server    = "https://kubernetes.default.svc"
#         namespace = "default"
#       }
#       syncPolicy = {
#         automated = {
#           prune     = true
#           selfHeal  = true
#         }
#       }
#     }
#   }

#   depends_on = [helm_release.argo_cd]
# }
