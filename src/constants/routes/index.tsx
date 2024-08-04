import {
  AlertCircleIcon,
  Clipboard,
  LayoutDashboardIcon,
  User2Icon,
  UsersIcon,
} from 'lucide-react';
import { ReactElement } from 'react';

export type Route = {
  label: string;
  href: string;
  icon: ReactElement;
};

const adminRoutes: Route[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: <LayoutDashboardIcon size={18} />,
  },
  {
    label: 'Visitor Management',
    href: '/dashboard/visitors',
    icon: <User2Icon size={18} />,
  },
  {
    label: 'Emergency',
    href: '/dashboard/emergency',
    icon: <AlertCircleIcon size={18} />,
  },
  {
    label: 'Visitor Visits',
    href: '/dashboard/visitors/visits',
    icon: <User2Icon size={18} />,
  },
  {
    label: 'Employee Management',
    href: '/dashboard/employees',
    icon: <UsersIcon size={18} />,
  },
  {
    label: 'Employee Visits',
    href: '/dashboard/employees/visits',
    icon: <Clipboard size={18} />,
  },
];

const visitorRoutes: Route[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: <LayoutDashboardIcon size={18} />,
  },
  // {
  //   label: 'Visits',
  //   href: '/dashboard/visits/:visitorId',
  //   icon: <User2Icon size={18} />,
  // },
];

const employeeRoutes: Route[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: <LayoutDashboardIcon size={18} />,
  },
  // {
  //   label: 'Employee',
  //   href: '/dashboard/employees/visits/:employeeId',
  //   icon: <User2Icon size={18} />,
  // },
];

export { adminRoutes, visitorRoutes, employeeRoutes };
