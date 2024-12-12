resource "helm_release" "web-app" {
  name       = "web-app-release"  # This value becomes .Release.Name in templates
  chart      = "../helm/web-app"  # This is the path to the chart directory
  namespace  = "kube-system"
  atomic     = true       # Rollback on failure
  timeout    = 300        # 5 minute timeout
  wait       = true

  values = [
    file("${path.module}/../helm/web-app/values.yaml"),
    jsonencode({
      backend = {
        extraEnv = [
          {
            name  = "POSTGRES_SERVER"
            value = replace(aws_db_instance.postgres.endpoint, ":5432", "") # Remove port from endpoint
          },
          {
            name  = "POSTGRES_PORT"
            value = tostring(aws_db_instance.postgres.port)
          },
          {
            name  = "POSTGRES_DB"
            value = aws_db_instance.postgres.db_name
          },
          # {
          #   name  = "POSTGRES_USER"
          #   value = aws_db_instance.postgres.username
          # },
          # {
          #   name  = "POSTGRES_PASSWORD"
          #   value = aws_db_instance.postgres.password
          # }
        ]
      }
    })
  ]

  depends_on = [
    aws_eks_cluster.eks,
    aws_eks_node_group.general,
    aws_subnet.public_zone_1,
    aws_subnet.public_zone_2,
  ]
}
