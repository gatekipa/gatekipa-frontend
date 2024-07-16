import { EyeIcon, LayoutDashboardIcon, User2Icon } from "lucide-react";
import { ReactElement } from "react";

type Route = {
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
  // {
  //   label: "Profile",
  //   href: "/profile",
  //   icon: <User2Icon size={18} />,
  // },
  {
    label: "Visitors",
    href: "/dashboard/visitors",
    icon: <User2Icon size={18} />,
  },
  {
    label: "Change Password",
    href: "/dashboard/change-password",
    icon: <EyeIcon size={18} />,
  },
];

const visitorRoutes: Route[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboardIcon size={18} />,
  },
  // {
  //   label: "Profile",
  //   href: "/profile",
  //   icon: <User2Icon size={18} />,
  // },
  {
    label: "Visits",
    href: "/dashboard/visits/:visitorId",
    icon: <User2Icon size={18} />,
  },
  {
    label: "Change Password",
    href: "/dashboard/change-password",
    icon: <EyeIcon size={18} />,
  },
];

export { adminRoutes, visitorRoutes };
