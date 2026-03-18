export const pricingPlans = [
  {
    id: "free",
    name: "Free",
    price: 0,
    currency: "₹",
    duration: "month",
    description: "Perfect for individuals getting started",
    features: [
      "5 GB Secure Storage",
      "Basic File Sharing",
      "Limited Upload Speed",
      "Community Support",
    ],
    cta: "Get Started",
    highlighted: false,
  },
  {
    id: "starter",
    name: "Starter",
    price: 199,
    currency: "₹",
    duration: "month",
    description: "Best for freelancers and personal use",
    features: [
      "50 GB Secure Storage",
      "Unlimited File Sharing",
      "Fast Upload Speed",
      "Email Support",
    ],
    cta: "Start Free Trial",
    highlighted: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: 499,
    currency: "₹",
    duration: "month",
    description: "Ideal for professionals and small teams",
    features: [
      "200 GB Secure Storage",
      "Priority Upload Speed",
      "Advanced Sharing Controls",
      "Priority Email Support",
      "Activity Logs",
    ],
    cta: "Upgrade Now",
    highlighted: true, // featured plan
  },
  
];