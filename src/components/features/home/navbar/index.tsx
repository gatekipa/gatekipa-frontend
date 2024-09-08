import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../../assets/logo.svg";
import { navLinks } from "@/constants/data";
import { MenuIcon, X } from "lucide-react";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className="px-4 lg:px-6 h-16 flex items-center bg-primary text-white">
      <Link className="flex items-center justify-center" to="#">
        <img src={logo} alt="logo" className="w-8" />
        <span className="ml-2 text-2xl font-bold font-cursive__pacifico">
          Gate Kipa
        </span>
      </Link>
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
            className="text-sm font-medium hover:underline underline-offset-4"
            to={link.href}
          >
            {link.name}
          </Link>
        ))}
        <Button variant="accent" size="sm" className="ml-3">
          Login / Sign Up
        </Button>
      </nav>

      <div
        className={`fixed top-0 left-0 h-full bg-primary text-white w-64 transform ${
          isMenuOpen ? "translate-x-0 z-40" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:hidden`}
      >
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
          <Button variant="accent" size="sm" className="mt-3">
            Login / Sign Up
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
