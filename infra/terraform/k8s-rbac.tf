
# Define the custom ClusterRole "viewer"
resource "kubernetes_cluster_role" "viewer" {
  metadata {
    name = "viewer"
  }

  rule {
    api_groups = ["*"]
    resources  = ["deployments", "configmaps", "pods", "secrets", "services"]
    verbs      = ["get", "list", "watch"]
  }
}

# Bind the "viewer" ClusterRole to the "my-viewer" group
resource "kubernetes_cluster_role_binding" "my_viewer_binding" {
  metadata {
    name = "my-viewer-binding"
  }

  role_ref {
    api_group = "rbac.authorization.k8s.io"
    kind      = "ClusterRole"
    name      = kubernetes_cluster_role.viewer.metadata[0].name
  }

  subject {
    kind      = "Group"
    name      = "my-viewer"
    api_group = "rbac.authorization.k8s.io"
  }
}

# Bind the existing "cluster-admin" ClusterRole to the "my-admin" group
resource "kubernetes_cluster_role_binding" "my_admin_binding" {
  metadata {
    name = "my-admin-binding"
  }

  role_ref {
    api_group = "rbac.authorization.k8s.io"
    kind      = "ClusterRole"
    name      = "cluster-admin"
  }

  subject {
    kind      = "Group"
    name      = "my-admin"
    api_group = "rbac.authorization.k8s.io"
  }
}
