output "eks_admin_role_arn" {
  value = aws_iam_role.eks_admin.arn
}

output "manager_user_arn" {
  value = aws_iam_user.manager.arn
}
