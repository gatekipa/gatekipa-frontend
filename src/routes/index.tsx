import { createBrowserRouter } from "react-router-dom";
import DashboardPage from "../pages/dashboard";
import LoginPage from "../pages/auth/login";
import RegistrationPage from "../pages/auth/register";
import AuthLayout from "../components/layout/auth";
import DashboardLayout from "../components/layout/dashboard";
import ChangePasswordPage from "../pages/dashboard/change-password";
import ForgotPasswordPage from "../pages/auth/forgotPassword";
import VerifyTokenPage from "../pages/auth/verifyToken";
import UpdatePasswordPage from "../pages/auth/updatePassword";
import HomePage from "../pages/home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <DashboardPage />,
      },
      {
        path: "change-password",
        element: <ChangePasswordPage />,
      },
    ],
  },
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegistrationPage />,
      },
      {
        path: "forgot-password",
        element: <ForgotPasswordPage />,
      },
      {
        path: "update-password",
        element: <UpdatePasswordPage />,
      },
      {
        path: "verify-token/:tempTokenId",
        element: <VerifyTokenPage />,
      },
    ],
  },
]);

export default router;
