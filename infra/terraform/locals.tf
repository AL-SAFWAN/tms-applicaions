# create local variables
# these will be paramaterized in the module

locals {
    region = "eu-west-2"
    zone_1 = "eu-west-2a"
    zone_2 = "eu-west-2b"
    environment = "testing"
    eks_name = "tms-eks"
    eks_version = "1.31"
    domain_name = "tms-applications.com" # Replace with your actual domain
    environment_domain = "local.${local.domain_name}"
}
