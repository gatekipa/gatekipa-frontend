import { IEmployee } from "@/app/features/employee/thunk";
import PaginatedTable from "@/components/shared/paginatedTable";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import useEmployees from "@/hooks/employees";
import { formatDate } from "@/utils";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";

const columns: ColumnDef<IEmployee>[] = [
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "designation",
    header: "Designation",
  },
  {
    accessorKey: "employeeNo",
    header: "Employee No",
  },
  {
    accessorKey: "emailAddress",
    header: "Email",
  },
  {
    accessorKey: "mobileNo",
    header: "Mobile Number",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ getValue }) => {
      const createdAt = getValue() as Date;
      return <span>{formatDate(new Date(createdAt))}</span>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const visitor = row.original;
      return <div className="flex items-center gap-2">{visitor.isActive}</div>;
    },
  },
];

const EmployeesPage: React.FC = () => {
  const { employees, loading } = useEmployees();

  return (
    <Card>
      <CardContent>
        <div className="flex justify-between items-center p-3 mt-8">
          <h2 className="text-2xl font-semibold">Employee Management</h2>
        </div>
      </CardContent>
      <div>
        <div className="flex gap-x-3 my-4 mx-6">
          <Input
            placeholder="Search By Email"
            // value={emailSearch}
            // onChange={(e) => setEmailSearch(e.target.value)}
          />
        </div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="mx-6 mb-8">
            <PaginatedTable data={employees} columns={columns} />
          </div>
        )}
      </div>
    </Card>
  );
};

export default EmployeesPage;
