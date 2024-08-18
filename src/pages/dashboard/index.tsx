import EmployeeDashboard from "@/components/features/employees/dashboard";
import VisitorDashboard from "@/components/features/visitors/dashboard";
import { UserRole } from "@/constants/enums";
import { getUserPlan, getUserRole } from "@/utils";

const DashboardPage: React.FC = () => {
  const role = getUserRole();
  const userPlan = getUserPlan();

  return (
    <div>
      <div>
        {role === UserRole.EMPLOYEE ? (
          <EmployeeDashboard />
        ) : role === UserRole.VISITOR ? (
          <VisitorDashboard />
        ) : (
          <h2 className="text-2xl text-gray-950 font-semibold">Dashboard</h2>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
