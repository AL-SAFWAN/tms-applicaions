output "vpc_id" {
  value = aws_vpc.main.id
}

output "private_subnets" {
  value = [
    aws_subnet.private_zone_1.id,
    aws_subnet.private_zone_2.id
  ]
}

output "public_subnets" {
  value = [
    aws_subnet.public_zone_1.id,
    aws_subnet.public_zone_2.id
  ]
}

output "igw_id" {
  value = aws_internet_gateway.igw.id
}

output "nat_gateway_id" {
  value = aws_nat_gateway.nat.id
}
