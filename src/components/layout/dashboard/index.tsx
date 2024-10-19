import { ThemeProvider } from "@/components/providers/theme";
import Navbar from "@/components/shared/navbar";
import { Card } from "@/components/ui/card";
import { mappedRoutes } from "@/constants";
import { UserRole } from "@/constants/enums";
import { getUserRole } from "@/utils";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../app/hooks";
import { MenuIcon } from "lucide-react";
import ToolTip from "@/components/shared/tooltip";
import { useMedia } from "react-use";

const DashboardLayout: React.FC = () => {
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.auth.user);
  const role = getUserRole() as UserRole;

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const isTablet = useMedia(
    "(min-width: 600px) and (max-width: 1024px)",
    false
  );

  useEffect(() => {
    if (isTablet) {
      setIsSidebarOpen(false);
    }
  }, [isTablet]);

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

  useEffect(() => {
    const sidebar = sidebarRef.current;
    if (sidebar) {
      sidebar.style.width = isSidebarOpen ? "256px" : "64px";
    }
  }, [isSidebarOpen]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex h-screen flex-col">
        <Navbar />
        <div className="flex-1 flex">
          <Card
            ref={sidebarRef}
            className="transition-all duration-300 ease-in-out py-4 rounded-none overflow-hidden"
            style={{ width: "256px" }}
          >
            <div className="h-full flex flex-col">
              <div
                className="space-y-1 px-2 ml-2.5"
                onClick={toggleSidebar}
                aria-label={
                  isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"
                }
              >
                <MenuIcon className="size-5 text-gray-700 cursor-pointer mb-3 dark:text-white" />
              </div>
              <nav className="space-y-1 px-2">
                {routes?.map((route) => (
                  <NavLink
                    key={route.href}
                    to={route.href}
                    end
                    className={({ isActive }) =>
                      `flex items-center gap-x-2 py-2 px-3 rounded-md transition duration-200 hover:opacity-75 ${
                        isActive &&
                        "underline underline-offset-4 text-primary font-semibold"
                      }`
                    }
                  >
                    <ToolTip title={route.label}>
                      <span>{route.icon}</span>
                    </ToolTip>
                    <span
                      className={`transition-opacity duration-300 text-sm ${
                        isSidebarOpen ? "opacity-100" : "opacity-0"
                      }`}
                      style={{
                        width: isSidebarOpen ? "auto" : "0",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                      }}
                    >
                      {route.label}
                    </span>
                  </NavLink>
                ))}
              </nav>
            </div>
          </Card>
          <main className="flex-1 overflow-x-hidden overflow-y-auto">
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
