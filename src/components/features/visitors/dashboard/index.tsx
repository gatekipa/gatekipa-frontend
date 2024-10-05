import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { Card, CardContent } from "@/components/ui/card";
import { getUserVisitorId } from "@/utils";
import React, { useEffect, useState } from "react";
import VisitsToolbar from "../../visits/toolbar";
import PaginatedTable from "@/components/shared/paginatedTable";
import { fetchVisitsThunk } from "@/app/features/company/thunk";
import { visitColumns } from "@/pages/dashboard/visits";
import { fetchEmployeesThunk } from "@/app/features/employee/thunk";

const VisitorDashboard: React.FC = () => {
  const dispatch = useAppDispatch();

  const { visits } = useAppSelector((state) => state.company);
  const { user } = useAppSelector((state) => state.auth);

  const [open, setOpen] = useState(false);
  const visitorId = getUserVisitorId();

  useEffect(() => {
    if (!visitorId && !user?.id) return;

    dispatch(
      fetchVisitsThunk({
        visitorId,
      })
    );

    dispatch(fetchEmployeesThunk({}));
  }, [user, visitorId]);

  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-between mt-6">
          <h1 className="flex items-center gap-x-3 text-2xl font-semibold">
            Visitor Dashboard
          </h1>
          <div>
            <VisitsToolbar
              visitorId={visitorId!}
              mode="toolbar"
              open={open}
              onClose={() => setOpen(false)}
              onOpen={() => setOpen(true)}
            />
          </div>
        </div>
        <div>
          <PaginatedTable data={visits} columns={visitColumns} />
        </div>
      </CardContent>
    </Card>
  );
};

export default VisitorDashboard;
