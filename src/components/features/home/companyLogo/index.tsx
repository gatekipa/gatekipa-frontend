import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../../assets/logo.svg";

const CompanyLogo: React.FC = () => (
  <Link className="flex items-center justify-center" to="/">
    <img src={logo} alt="logo" className="w-8" />
    <span className="ml-2 text-2xl font-bold font-cursive__pacifico">
      Gate Kipas
    </span>
  </Link>
);

export default CompanyLogo;
