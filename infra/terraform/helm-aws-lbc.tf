# configure iam permission for aws load balancer controller
# when destorying the lbc , the public zone 2 subnet gets hanged - need to fix this
data "aws_iam_policy_document" "aws_lbc" {
  statement {
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["pods.eks.amazonaws.com"]
    }

    actions = [
      "sts:AssumeRole",
      "sts:TagSession"
    ]
  }
}

resource "aws_iam_role" "aws_lbc" {
  name               = "${aws_eks_cluster.eks.name}-aws-lbc"
  assume_role_policy = data.aws_iam_policy_document.aws_lbc.json
}

resource "aws_iam_policy" "aws_lbc" {
  policy = file("./iam/AWSLoadBalancerController.json")
  name   = "AWSLoadBalancerController"
}

resource "aws_iam_role_policy_attachment" "aws_lbc" {
  policy_arn = aws_iam_policy.aws_lbc.arn
  role       = aws_iam_role.aws_lbc.name
}

# kube service account
resource "aws_eks_pod_identity_association" "aws_lbc" {
  cluster_name    = aws_eks_cluster.eks.name
  namespace       = "kube-system"
  service_account = "aws-load-balancer-controller"
  role_arn        = aws_iam_role.aws_lbc.arn
}

resource "helm_release" "aws_lbc" {
  name = "aws-load-balancer-controller"

  repository = "https://aws.github.io/eks-charts"
  chart      = "aws-load-balancer-controller"
  namespace  = "kube-system"
  version    = "1.8.1"

  set {
    name  = "clusterName"
    value = aws_eks_cluster.eks.name
  }

  set {
    name  = "serviceAccount.name"
    value = "aws-load-balancer-controller"
  }

  set {
    name  = "vpcId"
    value = aws_vpc.main.id
  }


  depends_on = [helm_release.cluster_autoscaler]

}

# this data part returned this Search returned 0 results, please revise so only one is returned
# because i had to manlly delete the load balancer because the public zone 2 subnet was hanged
# i think that why i returned 0 results


# so based on this, i'm guessing we need to delete the load balancer first before we can delete the lbc

# # Get the Load Balancer hostname
# data "aws_lb" "ingress" {
#   depends_on = [helm_release.web-app]
# }

# # Get hosted zone
# data "aws_route53_zone" "selected" {
#   name = local.domain_name # Make sure to define this in your locals
# }

# # Create DNS record for api subdomain
# resource "aws_route53_record" "api_ingress" {
#   zone_id = data.aws_route53_zone.selected.zone_id
#   name    = "api.${local.environment_domain}"
#   type    = "CNAME"
#   ttl     = "300"
#   records = [data.aws_lb.ingress.dns_name]

#   depends_on = [helm_release.web-app]
# }

# # Create DNS record for environment subdomain
# resource "aws_route53_record" "env_ingress" {
#   zone_id = data.aws_route53_zone.selected.zone_id
#   name    = local.environment_domain
#   type    = "CNAME"
#   ttl     = "300"
#   records = [data.aws_lb.ingress.dns_name]

#   depends_on = [helm_release.web-app]
# }

# output "load_balancer_dns_name" {
#   value = data.aws_lb.ingress.dns_name
# }

# output "route53_zone_id" {
#   value = data.aws_route53_zone.selected.zone_id
# }

# output "domain_names" {
#   value = "api.${local.environment_domain} and ${local.environment_domain}"
# }


# change the above to include the count

#locals {
#   lb_exists = length([for lb in aws_lb.ingress : lb.id]) > 0 ? true : false
# }

# resource "aws_route53_record" "api_ingress" {
#   count    = local.lb_exists ? 1 : 0
#   zone_id  = data.aws_route53_zone.selected.zone_id
#   name     = "api.${local.environment_domain}"
#   type     = "CNAME"
#   ttl      = "300"
#   records  = [data.aws_lb.ingress.dns_name]

#   depends_on = [data.aws_lb.ingress]
# }

# resource "aws_route53_record" "env_ingress" {
#   count    = local.lb_exists ? 1 : 0
#   zone_id  = data.aws_route53_zone.selected.zone_id
#   name     = local.environment_domain
#   type     = "CNAME"
#   ttl      = "300"
#   records  = [data.aws_lb.ingress.dns_name]

#   depends_on = [data.aws_lb.ingress]
# }
# The count property ensures the resources are only created when the load balancer exists.
