output "cluster_name" {
  value = aws_eks_cluster.eks.name
}

output "cluster_endpoint" {
  value = aws_eks_cluster.eks.endpoint
}

output "cluster_certificate_authority" {
  value = aws_eks_cluster.eks.certificate_authority
}

output "node_group_name" {
  value = aws_eks_node_group.general.node_group_name
}

output "cluster_arn" {
  value = aws_eks_cluster.eks.arn
}

output "oidc_issuer_url" {
  value = aws_eks_cluster.eks.identity[0].oidc[0].issuer
}

output "federated_identity_arn" {
  value = aws_iam_openid_connect_provider.eks.arn
}

output "federated_identity_url" {
  value = aws_iam_openid_connect_provider.eks.url
}
