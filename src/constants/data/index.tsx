import {
  AlertTriangle,
  BarChart3,
  Bell,
  Calendar,
  CheckCircle,
  Clock,
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

const stepCardList: StepCard[] = [
  {
    title: "Sign Up and Set Up",
    description:
      "Create an account and configure Gatekipa to suit your business.",
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

export { featureCardList, stepCardList };
