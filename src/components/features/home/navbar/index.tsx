import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { navLinks } from "@/constants/data";
import { MenuIcon, X } from "lucide-react";
import CompanyLogo from "../companyLogo";
import { getUsername } from "@/utils";

const Navbar: React.FC<{ isAuth?: boolean }> = ({ isAuth = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header
      className={`px-4 lg:px-6 h-16 flex items-center text-white fixed w-full z-50 ${
        isAuth ? "bg-gradient-to-r from-primary to-slate-700" : "bg-primary"
      }`}
    >
      <CompanyLogo />
      <button
        className="ml-auto block lg:hidden"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
      </button>

      <nav className="hidden lg:flex ml-auto gap-4 items-center sm:gap-6">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            className="text-sm font-medium hover:underline underline-offset-4 transition-opacity hover:opacity-80"
            to={link.href}
          >
            {link.name}
          </Link>
        ))}
        {!isAuth && <NavbarActionButton />}
      </nav>

      <div
        className={`fixed top-0 left-0 h-full bg-primary text-white w-64 transform ${
          isMenuOpen ? "translate-x-0 z-40" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:hidden`}
      >
        <div className="p-5">
          <CompanyLogo />
        </div>

        <nav className="flex flex-col p-6 gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              className="text-sm font-medium hover:underline underline-offset-4"
              to={link.href}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          {!isAuth && <NavbarActionButton />}
        </nav>
      </div>
    </header>
  );
};

const NavbarActionButton: React.FC = () => {
  return (
    <>
      {!getUsername() ? (
        <Button variant="accent" size="sm" className="ml-3">
          <Link to="/auth/login">Login / Sign Up</Link>
        </Button>
      ) : (
        <Button variant="accent" size="sm" className="ml-3">
          <Link to="/dashboard">Dashboard</Link>
        </Button>
      )}
    </>
  );
};

export default Navbar;
