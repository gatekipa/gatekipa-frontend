import { ThemeProvider } from "@/components/providers/theme";
import Navbar from "@/components/shared/navbar";
import { Card, CardContent } from "@/components/ui/card";
import { mappedRoutes } from "@/constants";
import { UserRole } from "@/constants/enums";
import { getUserRole } from "@/utils";
import React, { useEffect, useMemo, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";
import { MenuIcon } from "lucide-react";
import ToolTip from "@/components/shared/tooltip";

const DashboardLayout: React.FC = () => {
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.auth.user);
  const role = getUserRole() as UserRole;

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () =>
    setIsSidebarOpen((isSidebarOpen) => !isSidebarOpen);

  useEffect(() => {
    const role = getUserRole() as UserRole;
    if (!role) {
      navigate("/auth/login");
    }
  }, []);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");

    if (!user && !userInfo) {
      navigate("/auth/login");
    }
  }, [user]);

  useEffect(() => {
    const otp = JSON.parse(localStorage.getItem("otp")!) as {
      isVerified: boolean;
    };

    if (!otp.isVerified) {
      navigate("/auth/login");
    }
  }, []);

  const routes = useMemo(() => {
    return mappedRoutes[role];
  }, [role]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex h-screen flex-col">
        <Navbar />
        <div className="flex-1 grid grid-cols-1 md:grid-cols-6">
          <Card
            className={`${
              isSidebarOpen ? "w-64" : "w-16"
            } transition-all duration-300 ease-in-out py-4 rounded-none`}
          >
            <CardContent>
              <div
                className="self-end mb-4 mr-2"
                onClick={toggleSidebar}
                aria-label={
                  isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"
                }
              >
                <MenuIcon className="size-4 text-gray-700 cursor-pointer hover:text-gray-900" />
              </div>
              <aside
                className={`flex flex-col h-full ${
                  !isSidebarOpen && "justify-center items-center"
                }`}
              >
                {routes?.map((route) => (
                  <NavLink
                    key={route.href}
                    to={route.href}
                    end
                    className={({ isActive }) =>
                      `flex gap-x-2 py-2.5 text-sm rounded transition duration-200 ${
                        isActive
                          ? "underline underline-offset-4 font-semibold"
                          : ""
                      }`
                    }
                  >
                    <ToolTip title={route.label}>{route.icon}</ToolTip>

                    {isSidebarOpen && (
                      <span className="transition-all duration-300 ease-in-out">
                        {route.label}
                      </span>
                    )}
                  </NavLink>
                ))}
              </aside>
            </CardContent>
          </Card>
          <main className="col-span-5 overflow-x-hidden overflow-y-auto">
            <div className="container mx-auto px-6 py-8">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default DashboardLayout;
