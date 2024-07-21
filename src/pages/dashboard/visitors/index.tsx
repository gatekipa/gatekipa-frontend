import { fetchVisitorsThunk, IVisitor } from "@/app/features/company/thunk";
import { fetchEmployeesThunk } from "@/app/features/employee/thunk";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import VisitorToolbar from "@/components/features/visitors/toolbar";
import VisitsToolbar from "@/components/features/visits/toolbar";
import LoadingButton from "@/components/shared/loadingButton";
import PaginatedTable from "@/components/shared/paginatedTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { formatDate, getUserRole } from "@/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ExternalLink } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const columns: ColumnDef<IVisitor>[] = [
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
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
      return (
        <div className="flex items-center gap-2">
          <Link to={`/dashboard/visits/${visitor.id}`}>
            <Button
              size="sm"
              className="text-xs"
              variant="link"
              title="Display visits"
            >
              <ExternalLink className="mr-2" size={12} />
              Visits
            </Button>
          </Link>

          <VisitsToolbar visitorId={visitor.id} />
        </div>
      );
    },
  },
];

const VisitorsPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const [emailSearch, setEmailSearch] = useState("");
  const [phoneSearch, setPhoneSearch] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const { visitors, loading } = useAppSelector((state) => state.company);

  useEffect(() => {
    dispatch(fetchVisitorsThunk({}));
    dispatch(fetchEmployeesThunk());
  }, []);

  const handleSearch = useCallback(() => {
    dispatch(
      fetchVisitorsThunk({
        email: emailSearch,
        phoneNumber: phoneSearch,
        firstName,
        lastName,
      })
    );
  }, [emailSearch, phoneSearch, firstName, lastName]);

  const handleReset = useCallback(() => {
    dispatch(fetchVisitorsThunk({}));
    setPhoneSearch("");
    setEmailSearch("");
    setFirstName("");
    setLastName("");
  }, []);

  return (
    <Card>
      <CardContent>
        <div className="flex justify-between items-center p-3 mt-8">
          <h2 className="text-2xl text-gray-950 font-semibold">
            {getUserRole() === "ADMIN"
              ? "Visitor Management"
              : "Visit Management"}
          </h2>
          <VisitorToolbar />
        </div>
        <div>
          <div className="flex gap-x-3 my-4">
            <Input
              placeholder="Search By Email"
              value={emailSearch}
              onChange={(e) => setEmailSearch(e.target.value)}
            />
            <Input
              placeholder="Search By Mobile Number"
              value={phoneSearch}
              onChange={(e) => setPhoneSearch(e.target.value)}
            />
            <Input
              placeholder="Search By First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <Input
              placeholder="Search By Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <LoadingButton
              onClick={handleSearch}
              loading={loading}
              label="Search"
            />
            <Button onClick={handleReset}>Reset</Button>
          </div>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <PaginatedTable data={visitors} columns={columns} />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default VisitorsPage;
