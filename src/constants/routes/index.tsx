import {
  AlertCircleIcon,
  Clipboard,
  DollarSignIcon,
  FileIcon,
  LayoutDashboardIcon,
  Settings,
  User2Icon,
  UsersIcon,
} from "lucide-react";
import { ReactElement } from "react";

export type Route = {
  label: string;
  href: string;
  icon: ReactElement;
};

const adminRoutes: Route[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboardIcon size={18} />,
  },
  {
    label: "Visitor Management",
    href: "/dashboard/visitors",
    icon: <User2Icon size={18} />,
  },
  {
    label: "Emergency",
    href: "/dashboard/emergency",
    icon: <AlertCircleIcon size={18} />,
  },
  {
    label: "Visitor Visits",
    href: "/dashboard/visitors/visits",
    icon: <User2Icon size={18} />,
  },
  {
    label: "Employee Management",
    href: "/dashboard/employees",
    icon: <UsersIcon size={18} />,
  },
  {
    label: "Invoices",
    href: "/dashboard/invoice",
    icon: <FileIcon size={18} />,
  },
  {
    label: "User Management",
    href: "/dashboard/users",
    icon: <UsersIcon size={18} />,
  },
  {
    label: "Employee Visits",
    href: "/dashboard/employees/visits",
    icon: <Clipboard size={18} />,
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: <Settings size={18} />,
  },
];

const visitorRoutes: Route[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboardIcon size={18} />,
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: <Settings size={18} />,
  },
];

const employeeRoutes: Route[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboardIcon size={18} />,
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: <Settings size={18} />,
  },
];

const superAdminRoutes: Route[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboardIcon size={18} />,
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: <Settings size={18} />,
  },
  {
    label: "Pricing",
    href: "/dashboard/pricing",
    icon: <DollarSignIcon size={18} />,
  },
];

export { adminRoutes, visitorRoutes, employeeRoutes, superAdminRoutes };
