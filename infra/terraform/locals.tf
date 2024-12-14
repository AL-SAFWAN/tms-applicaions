locals {
  region             = "eu-west-2"
  zone_1             = "eu-west-2a"
  zone_2             = "eu-west-2b"
  eks_name           = "tms-eks"
  eks_version        = "1.31"

  domain_name        = "tms-applications.com"
  environment        = "local"
  environment_domain = local.environment
  full_domain = "${local.environment_domain}.${local.domain_name}"
  api_full_domain = "api.${local.full_domain}"
}
