resource "aws_subnet" "private_zone_1" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.0.0/19"
  availability_zone = local.zone_1

  tags = {
    Name = "${local.environment}-private-${local.zone_1}"
    "kubernetes.io/role/internal-elb" = "1"
    "kubernetes.io/cluster/${local.environment}-${local.eks_name}" = "owned"
  }
}

resource "aws_subnet" "private_zone_2" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.32.0/19" # different CIDR range
  availability_zone = local.zone_2

  tags = {
    Name = "${local.environment}-private-${local.zone_2}"
    "kubernetes.io/role/internal-elb" = "1"
    "kubernetes.io/cluster/${local.environment}-${local.eks_name}" = "owned"
  }
}

resource "aws_subnet" "public_zone_1" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.64.0/19"
  availability_zone       = local.zone_1
  map_public_ip_on_launch = true

  tags = {
    "Name" = "${local.environment}-public-${local.zone_1}"
    "kubernetes.io/role/elb" = "1"
    "kubernetes.io/cluster/${local.environment}-${local.eks_name}" = "owned"
  }
}

resource "aws_subnet" "public_zone_2" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.96.0/19"
  availability_zone       = local.zone_2
  map_public_ip_on_launch = true

  tags = {
    "Name" = "${local.environment}-public-${local.zone_2}"
    "kubernetes.io/role/elb" = "1"
    "kubernetes.io/cluster/${local.environment}-${local.eks_name}" = "owned"
  }
}
