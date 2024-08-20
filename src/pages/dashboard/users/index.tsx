import {
  fetchCompanyUsersThunk,
  ICompanyUser,
} from "@/app/features/company/thunk";
import { useAppDispatch } from "@/app/hooks";
import ChangeCompanyUserStatusModal from "@/components/features/employees/changeCompanyUserStatus";
import ColumnHeader from "@/components/shared/columnHeader";
import LoadingButton from "@/components/shared/loadingButton";
import PaginatedTable from "@/components/shared/paginatedTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useCompanyUsers from "@/hooks/company/users";
import { formatDate } from "@/utils";
import { ColumnDef } from "@tanstack/react-table";
import { Check, CircleOff } from "lucide-react";
import React, { useCallback, useMemo, useState } from "react";

const columns: ColumnDef<ICompanyUser>[] = [
  {
    accessorKey: "firstName",
    header: ({ column }) => <ColumnHeader column={column} label="First Name" />,
    enableSorting: true,
  },
  {
    accessorKey: "lastName",
    header: ({ column }) => <ColumnHeader column={column} label="Last Name" />,
    enableSorting: true,
  },
  {
    accessorKey: "emailAddress",
    header: ({ column }) => <ColumnHeader column={column} label="Email" />,
    enableSorting: true,
  },
  {
    accessorKey: "mobileNo",
    header: ({ column }) => (
      <ColumnHeader column={column} label="Mobile Number" />
    ),
    enableSorting: true,
  },
  {
    accessorKey: "isActive",
    header: ({ column }) => <ColumnHeader column={column} label="Active" />,
    cell: ({ getValue }) => {
      const isActive = getValue() as boolean;

      return <span>{isActive ? "Yes" : "No"}</span>;
    },
    enableSorting: true,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => <ColumnHeader column={column} label="Created At" />,
    enableSorting: true,
    cell: ({ getValue }) => {
      const createdAt = getValue() as Date;
      return <span>{formatDate(new Date(createdAt))}</span>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const companyUser = row.original;

      const [isModalOpen, setIsModalOpen] = useState(false);

      return (
        <>
          {!companyUser?.isActive ? (
            <CircleOff
              className="text-red-500 cursor-pointer hover:text-red-700"
              size={15}
              onClick={() => setIsModalOpen(true)}
            />
          ) : (
            <Check
              className="text-green-500 cursor-pointer hover:text-green-600"
              size={15}
              strokeWidth={3}
              onClick={() => setIsModalOpen(true)}
            />
          )}
          {isModalOpen && (
            <ChangeCompanyUserStatusModal
              companyUser={companyUser}
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />
          )}
        </>
      );
    },
  },
];

const UsersPage: React.FC = () => {
  const { companyUsers, loading, filterFn } = useCompanyUsers();

  const dispatch = useAppDispatch();

  const [query, setQuery] = useState({
    emailAddress: "",
    mobileNo: "",
    firstName: "",
    lastName: "",
    isActive: false,
  });

  const handleSearch = useCallback(() => {
    filterFn(query);
  }, [query]);

  const handleReset = useCallback(() => {
    dispatch(fetchCompanyUsersThunk({}));
    setQuery({
      emailAddress: "",
      mobileNo: "",
      firstName: "",
      lastName: "",
      isActive: false,
    });
  }, []);

  const disableCondition = useMemo(() => {
    return (
      !query.emailAddress &&
      !query.mobileNo &&
      !query.firstName &&
      !query.lastName &&
      !query.isActive
    );
  }, [query]);

  return (
    <Card>
      <CardContent>
        <div className="flex justify-between items-center p-3 mt-8">
          <h2 className="text-2xl font-semibold">User Management</h2>
        </div>
        <div>
          <div className="flex gap-x-3 my-4">
            <Input
              placeholder="Search By Email"
              value={query.emailAddress}
              onChange={(e) =>
                setQuery({ ...query, emailAddress: e.target.value })
              }
            />
            <Input
              placeholder="Search By Mobile Number"
              value={query.mobileNo}
              onChange={(e) => setQuery({ ...query, mobileNo: e.target.value })}
            />
            <Input
              placeholder="Search By First Name"
              value={query.firstName}
              onChange={(e) =>
                setQuery({ ...query, firstName: e.target.value })
              }
            />
            <Input
              placeholder="Search By Last Name"
              value={query.lastName}
              onChange={(e) => setQuery({ ...query, lastName: e.target.value })}
            />
            <div className="flex">
              <Label htmlFor="isActive">Active</Label>
              <Checkbox
                id="isActive"
                onCheckedChange={(checked) => {
                  setQuery({ ...query, isActive: !!checked.valueOf() });
                }}
              />
            </div>
            <LoadingButton
              onClick={handleSearch}
              loading={loading}
              label="Search"
              disabled={disableCondition}
            />
            <Button onClick={handleReset} disabled={disableCondition}>
              Reset
            </Button>
          </div>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <PaginatedTable data={companyUsers} columns={columns} />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UsersPage;
