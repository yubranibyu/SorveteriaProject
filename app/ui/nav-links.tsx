"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function NavLinks() {
  const pathname = usePathname();
    const links = [
        {name : "Home", href: "/"},
        {name : "Products", href: "/products"},
        {name : "About", href: "/about"},
        {name : "Contact", href: "/contact"},
    ]

  return (
    <nav className="bg-white p-4 shadow-md flex space-x-4 flex gap-20">
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "text-sm font-medium",
              isActive ? "text-blue-500" : "text-gray-500 hover:text-blue-500"
            )}
          >
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
}