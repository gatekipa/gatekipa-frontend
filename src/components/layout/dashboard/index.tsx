import { LogOutIcon, Menu } from "lucide-react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback } from "../../ui/avatar";
import { adminRoutes, visitorRoutes } from "../../../constants/routes";
import { Button } from "../../ui/button";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { logout } from "../../../app/features/auth/slice";

const DashboardLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");

    if (!user && !userInfo) {
      navigate("/auth/login");
    }
  }, [user]);

  const handleLogout = useCallback(() => {
    dispatch(logout());
    navigate("/auth/login");
  }, []);

  const routes = useMemo(
    () => (user?.userType === "VISITOR" ? visitorRoutes : adminRoutes),
    [user]
  );

  return (
    <div className="flex h-screen bg-gray-100">
      <div
        className={`bg-primary text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 transition duration-200 ease-in-out md:w-80 h-full`}
      >
        <div className="flex flex-col justify-between h-full">
          <div>
            <Link
              to="/dashboard"
              className="text-white flex items-center space-x-2 px-4"
            >
              <Menu
                size={18}
                strokeWidth={2}
                color="#ffffff"
                onClick={() => setIsSidebarOpen(false)}
              />
              <span className="text-xl font-extrabold tracking-wide">
                GateKipa
              </span>
            </Link>
            <nav className="mt-6">
              {routes.map((route) => (
                <NavLink
                  key={route.href}
                  to={route.href}
                  end={
                    route.href === "/dashboard" ||
                    route.href === "/dashboard/change-password"
                  }
                  className={({ isActive }) =>
                    `flex gap-x-2 py-2.5 px-4 text-sm rounded transition duration-200 hover:bg-slate-800 ${
                      isActive
                        ? "underline underline-offset-4 font-semibold"
                        : ""
                    }`
                  }
                >
                  {route.icon}
                  <span> {route.label}</span>
                </NavLink>
              ))}
            </nav>
          </div>
          <Button
            className="flex gap-x-2 py-2.5 px-4 text-sm rounded transition duration-200 hover:bg-slate-800"
            onClick={handleLogout}
          >
            <LogOutIcon size={18} className="mr-2" />
            <span>Logout</span>
          </Button>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex justify-between items-center p-2 shadow-md md:justify-end">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="md:hidden"
          >
            <Menu size={24} strokeWidth={2} color={"#000000"} />
          </button>
          <div className="flex items-center gap-x-2 pr-6">
            <Avatar>
              <AvatarFallback className="bg-primary text-white">
                {user?.firstName[0]}
                {user?.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <p className="text-sm text-gray-900">
              {user?.firstName} {user?.lastName}
            </p>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200">
          <div className="container mx-auto px-6 py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
