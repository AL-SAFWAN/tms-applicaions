data "aws_secretsmanager_secret_version" "creds" {
  secret_id = "db-cred"
}
locals {
  db_cred = jsondecode(
    data.aws_secretsmanager_secret_version.creds.secret_string
  )
}

resource "aws_db_instance" "postgres" {
  identifier             = "${local.environment}-${local.eks_name}-postgres"
  allocated_storage      = 10
  engine                 = "postgres"
  engine_version         = "17.2"
  instance_class         = "db.t3.micro"
  #  todo use secrets manager
  db_name                = "app"
  username               = local.db_cred.username
  password               = local.db_cred.password

  vpc_security_group_ids = [aws_security_group.db.id]
  db_subnet_group_name   = aws_db_subnet_group.postgres.name

  publicly_accessible    = false
  skip_final_snapshot    = true
  deletion_protection    = false
  backup_retention_period = 0

  delete_automated_backups = true

  depends_on = [
    helm_release.aws_lbc
  ]
}

resource "aws_security_group" "db" {
  name   = "${local.environment}-db-sg"
  vpc_id = aws_vpc.main.id

  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"] # Allow access from only from VPC
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_db_subnet_group" "postgres" {
  name        = "${local.environment}-postgres-subnet-group"
  description = "Database subnet group"
  subnet_ids  = [aws_subnet.private_zone_1.id, aws_subnet.private_zone_2.id]

  tags = {
    Environment = local.environment
    Name        = "${local.environment}-postgres-subnet-group"
  }
}



output "creds" {
  sensitive = true
  value = local.db_cred
}

output "db_username" {
  sensitive = true
  value = local.db_cred.username
}
