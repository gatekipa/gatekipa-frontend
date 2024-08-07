import { createBrowserRouter } from 'react-router-dom';
import DashboardPage from '../pages/dashboard';
import LoginPage from '../pages/auth/login';
import RegistrationPage from '../pages/auth/register';
import AuthLayout from '../components/layout/auth';
import DashboardLayout from '../components/layout/dashboard';
import ChangePasswordPage from '../pages/dashboard/change-password';
import ForgotPasswordPage from '../pages/auth/forgotPassword';
import VerifyTokenPage from '../pages/auth/verifyToken';
import UpdatePasswordPage from '../pages/auth/updatePassword';
import HomePage from '../pages/home';
import VisitorsPage from '@/pages/dashboard/visitors';
import VisitsPage from '@/pages/dashboard/visits';
import EmployeesPage from '@/pages/dashboard/employees';
import EmployeeVisitsPage from '@/pages/dashboard/employees/visits';
import AllVisitsEmployeePage from '@/pages/dashboard/employees/all';
import AllVisitorVisitsPage from '@/pages/dashboard/visitors/visits';
import EmergencyPage from '@/pages/dashboard/emergency';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: 'dashboard',
    element: <DashboardLayout />,
    children: [
      {
        path: '',
        element: <DashboardPage />,
      },
      {
        path: 'change-password',
        element: <ChangePasswordPage />,
      },
      {
        path: 'visitors',
        element: <VisitorsPage />,
      },
      {
        path: 'emergency',
        element: <EmergencyPage />,
      },
      {
        path: 'visitors/visits',
        element: <AllVisitorVisitsPage />,
      },
      {
        path: 'employees',
        element: <EmployeesPage />,
      },
      {
        path: 'employees/visits/:employeeId',
        element: <EmployeeVisitsPage />,
      },
      {
        path: 'employees/visits',
        element: <AllVisitsEmployeePage />,
      },
      {
        path: 'visits/:visitorId',
        element: <VisitsPage />,
      },
    ],
  },
  {
    path: 'auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegistrationPage />,
      },
      {
        path: 'forgot-password',
        element: <ForgotPasswordPage />,
      },
      {
        path: 'update-password',
        element: <UpdatePasswordPage />,
      },
      {
        path: 'verify-token',
        element: <VerifyTokenPage />,
      },
    ],
  },
]);

export default router;
