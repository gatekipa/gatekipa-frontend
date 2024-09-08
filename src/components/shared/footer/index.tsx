import { footerLinks } from "@/constants/data";
import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
      <p className="text-xs text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} Gate Kipa. All rights reserved.
      </p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        {footerLinks.map((link) => (
          <Link
            key={link.name}
            className="text-xs hover:underline underline-offset-4"
            to={link.href}
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </footer>
  );
};

export default Footer;
