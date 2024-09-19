import React, { useCallback, useState } from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDownIcon, ChevronUpIcon, KeyRound, LogOut } from "lucide-react";
import { getCompany, getUsername } from "@/utils";
import { ModeToggle } from "../themeToggle";
import { Badge } from "@/components/ui/badge";
import logo from "../../../assets/logo.svg";
import { useAppDispatch } from "@/app/hooks";
import { toast } from "sonner";
import { logoutThunk } from "@/app/features/auth/thunk";

const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>();

  const handleLogout = useCallback(async () => {
    try {
      await dispatch(logoutThunk({})).unwrap();
      navigate("/auth/login");
    } catch (error) {
      toast.error(error as string);
    }
  }, []);

  const company = getCompany();

  return (
    <Menubar className="flex items-center py-7 px-3 rounded-none md:justify-between">
      <MenubarMenu>
        <div className="flex items-center">
          <Link to="/dashboard" className="flex items-center space-x-2 px-4">
            <img src={logo} alt="logo" className="w-8 h-8" />
            <span className="text-xl font-extrabold tracking-wide">
              GateKipa
            </span>
          </Link>
          {company && (
            <Badge variant="destructive" className="hidden uppercase md:block">
              {company}
            </Badge>
          )}
        </div>
      </MenubarMenu>
      <div className="flex gap-x-2 ml-auto">
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>
              <div
                className="flex gap-x-2 items-center"
                onClick={() => setIsMenuOpen((prev) => !prev)}
              >
                {getUsername()}
                {!isMenuOpen ? (
                  <ChevronDownIcon className="w-4 h-4" />
                ) : (
                  <ChevronUpIcon className="w-4 h-4" />
                )}
              </div>
            </MenubarTrigger>
            <MenubarContent>
              <Link to="change-password">
                <MenubarItem>
                  <KeyRound size={15} className="mr-2" />
                  Change Password
                </MenubarItem>
              </Link>
              <MenubarSeparator />
              <MenubarItem onClick={handleLogout}>
                <LogOut size={15} className="mr-2" />
                Logout
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
        <ModeToggle />
      </div>
    </Menubar>
  );
};

export default Navbar;
