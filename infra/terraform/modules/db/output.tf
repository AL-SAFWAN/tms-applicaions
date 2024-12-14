output "db_endpoint" {
  value = aws_db_instance.postgres.endpoint
}

output "db_name" {
  value = aws_db_instance.postgres.db_name
}

output "db_port" {
  value = aws_db_instance.postgres.port
}

output "db_username" {
  sensitive = true
  value     = aws_db_instance.postgres.username
}

output "security_group_id" {
  value = aws_security_group.db.id
}
