import { IEmployee } from '@/app/features/employee/thunk';
import { useAppSelector } from '@/app/hooks';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import React, { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EmployeeVisitsPage: React.FC = () => {
  const navigate = useNavigate();

  const { employeeId } = useParams();

  const { employees } = useAppSelector((state) => state.employee);

  const employee = useMemo(() => {
    return (
      employees.find((employee) => employee.id === employeeId) ??
      ({} as IEmployee)
    );
  }, [employeeId, employees]);

  return (
    <Card>
      <CardContent>
        <div className='flex items-center gap-x-2 mt-8'>
          <ArrowLeft
            strokeWidth={2}
            onClick={() => navigate(`/dashboard/employees`)}
            className='cursor-pointer'
          />
          <h2 className='text-2xl font-semibold'>
            Employee Visits {employeeId}
          </h2>
        </div>
      </CardContent>
      <div>
        <div>{employee?.firstName}</div>
      </div>
    </Card>
  );
};

export default EmployeeVisitsPage;
