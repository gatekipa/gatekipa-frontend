import { ThemeProvider } from "@/components/providers/theme";
import Navbar from "@/components/shared/navbar";
import { Card, CardContent } from "@/components/ui/card";
import { mappedRoutes } from "@/constants";
import { UserRole } from "@/constants/enums";
import { getUserRole } from "@/utils";
import React, { useEffect, useMemo } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";

const DashboardLayout: React.FC = () => {
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");

    if (!user && !userInfo) {
      navigate("/auth/login");
    }
  }, [user]);

  const routes = useMemo(() => {
    const role = getUserRole() as UserRole;
    return mappedRoutes[role];
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex h-screen flex-col">
        <Navbar />
        <div className="flex-1 grid grid-cols-1 md:grid-cols-6">
          <Card className="col-span-1 py-4 rounded-none">
            <CardContent>
              <aside>
                {routes.map((route) => (
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
                    {route.icon}
                    <span className="transition-all duration-300 ease-in-out hover:underline hover:underline-offset-4">
                      {" "}
                      {route.label}
                    </span>
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
