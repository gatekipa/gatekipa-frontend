import VisitorAuth from "@/components/features/visitors/auth";
import useEmployees from "@/hooks/employees";
import React from "react";

const ReceptionPage: React.FC = () => {
  useEmployees();

  return (
    <div className="space-y-3 h-screen">
      <h2 className="text-2xl font-bold mb-7">Welcome To GateKipas</h2>
      <section className="grid grid-cols-1 gap-3 md:grid-cols-6">
        <div className="col-span-2">
          <VisitorAuth />
        </div>
        <div className="col-span-4 border">Entries</div>
      </section>
    </div>
  );
};

export default ReceptionPage;
