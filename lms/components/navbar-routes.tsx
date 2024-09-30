"use client"; 

import { useEffect, useState } from "react";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { isTeacher } from "@/lib/teacher";
import { SearchInput } from "./search-input";
import { auth } from "@/auth";

export const NavbarRoutes = () => {
  const pathname = usePathname();
  const [userId, setUserId] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchSession = async () => {
      const res = await fetch('/api/session');
      const session = await res.json();
      setUserId(session?.user?.id || null);
    };
    fetchSession();
  }, []);


  const isTeacherPage = pathname?.startsWith("/teacher");
  const isCoursePage = pathname?.includes("/courses");
  const isSearchPage = pathname === "/dashboard/search";

  return (
    <>
      
        <div className="hidden md:block">
          <SearchInput />
        </div>
   
      {/* <div className="flex gap-x-2 ml-auto">
        {isTeacherPage || isCoursePage ? (
          <Link href="/">
            <Button size="sm" variant="ghost">
              <LogOut className="h-4 w-4 mr-2" />
              Exit
            </Button>
          </Link>
        ) : isTeacher(userId) ? (
          <Link href="/dashboard/teacher/courses">
            <Button size="sm" variant="ghost">
              Teacher mode
            </Button>
          </Link>
        ) : null}
      </div> */}
    </>
  );
};
