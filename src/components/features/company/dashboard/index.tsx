import React from "react";
import Tiles from "./tiles";
import CompanyDetailsForm from "./companyForm";

const CompanyDashboard: React.FC = () => {
  return (
    <section>
      <Tiles />
      <CompanyDetailsForm />
    </section>
  );
};

export default CompanyDashboard;
