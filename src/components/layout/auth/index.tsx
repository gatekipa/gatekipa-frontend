import React from "react";
import { Outlet } from "react-router-dom";
import logo from "../../../assets/logo.svg";
import Navbar from "@/components/features/home/navbar";
import Footer from "@/components/shared/footer";

const AuthLayout: React.FC = () => {
  return (
    <>
      <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-primary lg:bg-white">
        <Navbar isAuth />
        <div className="flex flex-col justify-center items-center">
          <Outlet />
        </div>
        <div className="hidden bg-primary text-white lg:block">
          <div className="h-full flex flex-col justify-center items-center gap-y-4">
            <div className="flex items-center gap-x-3">
              <img src={logo} alt="logo" className="w-32" />
              <p className="text-2xl font-bold font-cursive__pacifico">
                GATEKIPA
              </p>
            </div>
            <p className="text-sm shadow-sm">
              Take Control of Your Space. Manage Who Enters.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default AuthLayout;
