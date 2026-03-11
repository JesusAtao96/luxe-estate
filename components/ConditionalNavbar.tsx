"use client";

import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface ConditionalNavbarProps {
  children: ReactNode;
}

export default function ConditionalNavbar({ children }: ConditionalNavbarProps) {
  const pathname = usePathname();

  // Hide the navbar on the login page and admin pages
  if (pathname === "/login" || pathname.startsWith("/admin")) {
    return null;
  }

  return <>{children}</>;
}
