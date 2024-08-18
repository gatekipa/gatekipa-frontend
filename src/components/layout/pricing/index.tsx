import { ThemeProvider } from "@/components/providers/theme";
import Navbar from "@/components/shared/navbar";
import React from "react";
import { Outlet } from "react-router-dom";

const PricingLayout: React.FC = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex h-screen flex-col">
        <Navbar />
        <Outlet />
      </div>
    </ThemeProvider>
  );
};

export default PricingLayout;
