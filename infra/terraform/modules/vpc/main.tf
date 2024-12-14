resource "aws_vpc" "main" {
  cidr_block = var.vpc_cidr
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = {
    Name = "${var.environment}-main"
  }
}

resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.main.id
  tags = {
    Name = "${var.environment}-igw"
  }
}

resource "aws_eip" "nat" {
  domain = "vpc"
  tags = {
    Name = "${var.environment}-nat"
  }
}

resource "aws_nat_gateway" "nat" {
  allocation_id = aws_eip.nat.id
  subnet_id     = aws_subnet.public_zone_1.id

  tags = {
    Name = "${var.environment}-nat"
  }

  depends_on = [
    aws_internet_gateway.igw
  ]
}

resource "aws_subnet" "private_zone_1" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = var.private_subnet_1_cidr
  availability_zone = var.zone_1

  tags = {
    Name = "${var.environment}-private-${var.zone_1}"
    "kubernetes.io/role/internal-elb" = "1"
    "kubernetes.io/cluster/${var.environment}-${var.eks_name}" = "owned"
  }
}

resource "aws_subnet" "private_zone_2" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = var.private_subnet_2_cidr
  availability_zone = var.zone_2

  tags = {
    Name = "${var.environment}-private-${var.zone_2}"
    "kubernetes.io/role/internal-elb" = "1"
    "kubernetes.io/cluster/${var.environment}-${var.eks_name}" = "owned"
  }
}

resource "aws_subnet" "public_zone_1" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = var.public_subnet_1_cidr
  availability_zone       = var.zone_1
  map_public_ip_on_launch = true

  tags = {
    Name = "${var.environment}-public-${var.zone_1}"
    "kubernetes.io/role/elb" = "1"
    "kubernetes.io/cluster/${var.environment}-${var.eks_name}" = "owned"
  }
}

resource "aws_subnet" "public_zone_2" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = var.public_subnet_2_cidr
  availability_zone       = var.zone_2
  map_public_ip_on_launch = true

  tags = {
    Name = "${var.environment}-public-${var.zone_2}"
    "kubernetes.io/role/elb" = "1"
    "kubernetes.io/cluster/${var.environment}-${var.eks_name}" = "owned"
  }
}

resource "aws_route_table" "private" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.nat.id
  }

  tags = {
    Name = "${var.environment}-private"
  }
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }

  tags = {
    Name = "${var.environment}-public"
  }
}

resource "aws_route_table_association" "private_zone_1" {
  subnet_id      = aws_subnet.private_zone_1.id
  route_table_id = aws_route_table.private.id
}

resource "aws_route_table_association" "private_zone_2" {
  subnet_id      = aws_subnet.private_zone_2.id
  route_table_id = aws_route_table.private.id
}

resource "aws_route_table_association" "public_zone_1" {
  subnet_id      = aws_subnet.public_zone_1.id
  route_table_id = aws_route_table.public.id
}

resource "aws_route_table_association" "public_zone_2" {
  subnet_id      = aws_subnet.public_zone_2.id
  route_table_id = aws_route_table.public.id
}
