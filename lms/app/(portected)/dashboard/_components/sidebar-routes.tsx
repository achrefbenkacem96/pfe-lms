"use client";

import { usePathname } from "next/navigation";

import { SidebarItem } from "./sidebar-item";
import { signOut, useSession } from "next-auth/react";
import { HiArrowLeftOnRectangle } from "react-icons/hi2";
import Avatar from "@/components/Avatar";
import { useEffect, useState } from "react";
import { adminRoutes, studentRoutes, supportRoutes, teacherRoutes } from "@/routes";
import { LucideProps } from "lucide-react";

interface Route {
  icon: React.ForwardRefExoticComponent<
    React.PropsWithoutRef<LucideProps> & React.RefAttributes<SVGSVGElement>
  >;
  label: string;
  href: string;
}

export const SidebarRoutes = () => {
  const pathname = usePathname();
  const session = useSession();
  const currentUser = session.data?.user;
  const isTeacherPage = pathname?.includes("/teacher");

  // Specify the type of `routes`
  const [routes, setRoutes] = useState<Route[]>([]);

  useEffect(() => {
    switch (currentUser?.role) {
      case "TEACHER":
        setRoutes(teacherRoutes);
        break;
      case "ADMIN":
        setRoutes(adminRoutes);
        break;
      case "STUDENT":
        setRoutes(studentRoutes);
        break;
      case "SUPPORT":
        setRoutes(supportRoutes);
        break;
    }
  }, [currentUser]);
    return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
      
    </div>
  )
}