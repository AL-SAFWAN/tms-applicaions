resource "aws_security_group" "db" {
  name   = "${var.environment}-db-sg"
  vpc_id = var.vpc_id

  ingress {
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"] # adjust if needed
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Environment = var.environment
    Name        = "${var.environment}-db-sg"
  }
}

resource "aws_db_subnet_group" "postgres" {
  name        = "${var.environment}-postgres-subnet-group"
  description = "Database subnet group"
  subnet_ids  = var.private_subnets

  tags = {
    Environment = var.environment
    Name        = "${var.environment}-postgres-subnet-group"
  }
}

resource "aws_db_instance" "postgres" {
  identifier             = "${var.environment}-${var.eks_name}-postgres"
  allocated_storage      = var.allocated_storage
  engine                 = var.engine
  engine_version         = var.engine_version
  instance_class         = var.instance_class
  db_name                = var.db_name
  username               = var.db_username
  password               = var.db_password
  vpc_security_group_ids = [aws_security_group.db.id]
  db_subnet_group_name   = aws_db_subnet_group.postgres.name
  publicly_accessible    = var.publicly_accessible
  skip_final_snapshot    = var.skip_final_snapshot
  deletion_protection    = var.deletion_protection
  backup_retention_period = var.backup_retention_period
  delete_automated_backups = var.delete_automated_backups

  tags = {
    Environment = var.environment
    Name        = "${var.environment}-postgres"
  }
}
