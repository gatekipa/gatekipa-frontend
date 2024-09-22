import { useAppSelector } from "@/app/hooks";
import CompanyDashboard from "@/components/features/company/dashboard";
import EmployeeDashboard from "@/components/features/employees/dashboard";
import MFAWarningDialog from "@/components/features/mfa/warningDialog";
import SuperAdminDashboard from "@/components/features/superAdmin";
import VisitorDashboard from "@/components/features/visitors/dashboard";
import { UserRole } from "@/constants/enums";
import { getCompanySubscriptionStatus, getUserRole } from "@/utils";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DashboardPage: React.FC = () => {
  const role = getUserRole();

  const navigate = useNavigate();
  const { paymentSuccessResponse } = useAppSelector((state) => state.pricing);

  useEffect(() => {
    const isSubscriptionActive = getCompanySubscriptionStatus();
    const userRole = getUserRole();
    if (paymentSuccessResponse) return;
    if (userRole === "ADMIN" && !isSubscriptionActive) navigate("/pricing");
  }, [paymentSuccessResponse]);

  return (
    <div>
      <MFAWarningDialog />
      {role === UserRole.EMPLOYEE ? (
        <EmployeeDashboard />
      ) : role === UserRole.VISITOR ? (
        <VisitorDashboard />
      ) : role === UserRole.SUPER_ADMIN ? (
        <SuperAdminDashboard />
      ) : (
        <CompanyDashboard />
      )}
    </div>
  );
};

export default DashboardPage;
