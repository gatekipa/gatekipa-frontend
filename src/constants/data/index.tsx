import {
  AlertTriangle,
  BarChart,
  BarChart3,
  Bell,
  Calendar,
  CheckCircle,
  Clock,
  Share2,
  UserCog,
  Users,
  Lock,
  Zap,
  Shield,
  Mail,
} from "lucide-react";

interface FeatureCard {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface StepCard {
  title: string;
  description: string;
}

interface Testimonial {
  text: string;
  reviewer: string;
  logo: string;
}

interface NavLink {
  name: string;
  href: string;
}

interface SellingPoint {
  icon: React.ElementType;
  text: string;
}

const featureCardList: FeatureCard[] = [
  {
    icon: <CheckCircle className="h-10 w-10 text-primary" />,
    title: "Quick Check-In/Check-Out",
    description:
      "Simplified visitor management with just a phone number or QR code.",
  },
  {
    icon: <Clock className="h-10 w-10 text-primary" />,
    title: "Digital Records",
    description:
      "Store and access visitor and employee data securely in the cloud.",
  },
  {
    icon: <Bell className="h-10 w-10 text-primary" />,
    title: "Host Notifications",
    description:
      "Notify hosts when visitors arrive via in-app or SMS notifications.",
  },
  {
    icon: <Calendar className="h-10 w-10 text-primary" />,
    title: "Shift Scheduling & Payroll Integration",
    description:
      "Manage staff shifts and integrate with payroll systems seamlessly.",
  },
  {
    icon: <AlertTriangle className="h-10 w-10 text-primary" />,
    title: "Emergency Reporting",
    description:
      "Generate lists of everyone currently in the building in case of emergencies.",
  },
  {
    icon: <BarChart3 className="h-10 w-10 text-primary" />,
    title: "Customizable Dashboards",
    description:
      "Get a complete overview of visitor and employee activity with detailed analytics.",
  },
];

interface Condition {
  title: string;
  content: string;
}

const stepCardList: StepCard[] = [
  {
    title: "Sign Up and Set Up",
    description:
      "Create an account and configure Gatekipas to suit your business.",
  },
  {
    title: "Check-In Visitors",
    description: "Use digital check-in/check-out for visitors with ease.",
  },
  {
    title: "Track and Report",
    description: "Generate comprehensive reports and manage staff shifts.",
  },
];

const testimonialList: Testimonial[] = [
  {
    text: "Gatekipas helped us streamline visitor check-ins and made shift management a breeze.",
    reviewer: "Company Name",
    logo: "https://www.vectorlogo.zone/logos/google/google-icon.svg",
  },
  {
    text: "Gatekipas has been a game-changer for our business. We can now manage visitors and staff with ease.",
    reviewer: "Company Name",
    logo: "https://www.vectorlogo.zone/logos/google/google-icon.svg",
  },
  {
    text: "We have been using Gatekipas for a few months now and it has made a huge difference in our operations.",
    reviewer: "Company Name",
    logo: "https://www.vectorlogo.zone/logos/google/google-icon.svg",
  },
  {
    text: "We love how easy it is to track employee attendance and generate payroll reports.",
    reviewer: "Company Name",
    logo: "https://www.vectorlogo.zone/logos/google/google-icon.svg",
  },
];

const navLinks: NavLink[] = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Features",
    href: "/#features",
  },
  {
    name: "Pricing",
    href: "/pricing-landing",
  },
  {
    name: "Contact Us",
    href: "/contact",
  },
];

const footerLinks: NavLink[] = [
  {
    name: "Terms of Service",
    href: "/terms-conditions",
  },
  {
    name: "Privacy",
    href: "/privacy",
  },
  {
    name: "About Us",
    href: "/about",
  },
];

const privacyPolicies = [
  {
    title: "Information We Collect",
    icon: <Users className="h-6 w-6" />,
    content: [
      "Personal Information: When you sign up for Gatekipas, we collect personal information such as your name, email address, phone number, and billing details.",
      "Visitor and Employee Data: We collect data on visitors and employees when they check in or out using our platform, including names, phone numbers, and photos.",
      "Usage Data: We collect data about how you interact with our website and application to improve our services.",
    ],
  },
  {
    title: "How We Use Your Information",
    icon: <BarChart className="h-6 w-6" />,
    content: [
      "Service Delivery: We use your data to provide and improve our visitor and employee management services.",
      "Communication: We use your email and phone number to send notifications, updates, and respond to inquiries.",
      "Analytics: We use usage data to analyze how our services are used and make improvements.",
    ],
  },
  {
    title: "Sharing of Data",
    icon: <Share2 className="h-6 w-6" />,
    content: [
      "We do not sell or share your personal information with third parties except when required by law or with your consent.",
    ],
  },
  {
    title: "Security",
    icon: <Lock className="h-6 w-6" />,
    content: [
      "We implement industry-standard security measures to protect your data from unauthorized access and breaches.",
    ],
  },
  {
    title: "Data Retention",
    icon: <Clock className="h-6 w-6" />,
    content: [
      "We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law.",
    ],
  },
  {
    title: "Your Rights",
    icon: <UserCog className="h-6 w-6" />,
    content: [
      "You have the right to access, update, or delete your personal information. To exercise these rights, contact us at support@gatekipas.com.",
    ],
  },
];

const sellingPoints: SellingPoint[] = [
  {
    icon: Zap,
    text: "User-Friendly Interface: Easy to set up and use, so you can get started in minutes.",
  },
  {
    icon: Users,
    text: "Flexible Plans: Scalable to fit businesses of any size.",
  },
  {
    icon: Shield,
    text: "Secure and Reliable: Built with the highest security standards to keep your data safe.",
  },
  {
    icon: Mail,
    text: "Dedicated Support: Our team is always here to help you make the most out of Gatekipas.",
  },
];

const conditions: Condition[] = [
  {
    title: "Use of Services",
    content:
      "Gatekipas provides visitor and employee management software for businesses. You agree to use our services in accordance with applicable laws and these terms.",
  },
  {
    title: "User Accounts",
    content:
      "You are responsible for maintaining the confidentiality of your account credentials. You must notify us immediately if you suspect any unauthorized use of your account.",
  },
  {
    title: "Subscription and Billing",
    content:
      "Gatekipas operates on a subscription model. By subscribing, you agree to provide accurate billing information and pay the fees associated with your chosen plan.",
  },
  {
    title: "Termination",
    content:
      "We reserve the right to suspend or terminate your account if you violate these terms.",
  },
  {
    title: "Limitation of Liability",
    content:
      "Gatekipas is not liable for any direct, indirect, incidental, or consequential damages that arise from your use of the platform.",
  },
  {
    title: "Governing Law",
    content:
      "These terms shall be governed by the laws of [Country], without regard to its conflict of law provisions.",
  },
];

export {
  featureCardList,
  stepCardList,
  testimonialList,
  navLinks,
  footerLinks,
  privacyPolicies,
  sellingPoints,
  conditions,
};
