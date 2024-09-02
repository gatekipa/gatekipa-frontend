import React from "react";
import Tiles from "./tiles";
import CompanyDetailsForm from "./companyForm";
import useCompany from "@/hooks/company";

const CompanyDashboard: React.FC = () => {
  const { company, loading } = useCompany();

  return (
    <section>
      <Tiles />
      {loading ? <p>Loading...</p> : <CompanyDetailsForm company={company!} />}
    </section>
  );
};

export default CompanyDashboard;
