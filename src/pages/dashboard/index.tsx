import { useAppSelector } from "@/app/hooks";
import EmployeeDashboard from "@/components/features/employees/dashboard";
import VisitorDashboard from "@/components/features/visitors/dashboard";
import { UserRole } from "@/constants/enums";
import { getUserPlan, getUserRole } from "@/utils";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DashboardPage: React.FC = () => {
  const role = getUserRole();
  const navigate = useNavigate();
  const { paymentSuccessResponse } = useAppSelector((state) => state.pricing);

  useEffect(() => {
    const userPlan = getUserPlan();
    console.log("userPlan :>> ", userPlan);
    if (paymentSuccessResponse) return;
    if (userPlan && !userPlan?.isSubscriptionActive) navigate("/pricing");
  }, [paymentSuccessResponse]);

  return (
    <div>
      {role === UserRole.EMPLOYEE ? (
        <EmployeeDashboard />
      ) : role === UserRole.VISITOR ? (
        <VisitorDashboard />
      ) : (
        <h2 className="text-2xl text-gray-950 font-semibold">Dashboard</h2>
      )}
    </div>
  );
};

export default DashboardPage;
