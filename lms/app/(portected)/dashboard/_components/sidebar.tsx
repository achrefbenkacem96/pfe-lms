"use client"
import Avatar from "@/components/Avatar"
import { Logo } from "./logo"
import { SidebarRoutes } from "./sidebar-routes"
import { useSession } from "next-auth/react";
import { HiArrowLeftOnRectangle } from "react-icons/hi2";
import { SidebarItem } from "./sidebar-item";
import { useRouter } from "next/navigation";
import { IconType } from "react-icons";
interface Route {
  icon: IconType;  
  label: string;
  href: string;
}
export const Sidebar = () => {
  const router = useRouter();

  const session = useSession();
  const currentUser = session.data?.user;
  const route: Route = {
    label: "Logout",
    href: "#",
    icon: HiArrowLeftOnRectangle, // React icon
  };
  return (
    <div className="h-full border-r flex flex-col overflow-y-auto bg-white shadow-sm">
      <div className="p-6">
        {/* <Logo /> */}
      </div>
      <div className="flex flex-col py-6 w-full">
      <nav className="mt-4 flex flex-col justify-between items-center">
          <div 
            className="cursor-pointer hover:opacity-75 transition"
            onClick={ () => router.push("/dashboard/profile")}
          >
            <Avatar user={currentUser} />
          </div>
        </nav>
      </div>
      <div className="flex flex-col w-full">
        <SidebarRoutes />
      </div>
      <div className="flex flex-col mt-auto w-full">
      <div className="flex flex-col w-full">
      
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href=""
        />
    
      
    </div>
      </div>
    </div>
  )
}