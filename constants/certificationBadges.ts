/**
 * Local certification badge assets under public/badges/.
 * width/height must match the actual PNG pixel dimensions so Next/Image does not
 * upscale low-res sources (which caused blur on the About cards).
 * Replace files with higher-resolution exports (e.g. 512–800px squares) when available.
 */
export const certificationBadges = [
  {
    title: "AWS Certified Solutions Architect",
    src: "/badges/AWS%20Certified%20Solutions%20Architect%20Badge.png",
    width: 270,
    height: 270,
  },
  {
    title: "Certified Kubernetes Administrator (CKA)",
    src: "/badges/CKA%20Certified%20Kubernetes%20Administrator%20Badge.png",
    width: 270,
    height: 270,
  },
  {
    title: "HashiCorp Certified Terraform Associate",
    src: "/badges/HashiCorp%20Certified%20Terraform%20Associate%20Badge.png",
    width: 272,
    height: 272,
  },
  {
    title: "HashiCorp Certified Consul Associate",
    src: "/badges/HashiCorp%20Certified%20Consul%20Associate%20Badge.png",
    width: 1600,
    height: 1600,
  },
  {
    title: "Amazon EKS Training",
    src: "/badges/Amazon%20EKS%20Training%20Badge.png",
    width: 270,
    height: 270,
  },
] as const;
