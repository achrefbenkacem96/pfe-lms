import { auth } from "@/auth";
import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";
import { SessionProvider } from "next-auth/react";
import { headers } from "next/headers";

const DashboardLayout = async ({
  children
}: {
  children: React.ReactNode;
}) => {
  const session = await auth()
  const headersList = headers();

  const fullUrl = headersList.get('referer') || "";
  console.log("🚀 ~ fullUrl:", fullUrl)
  const isSearchPage = fullUrl.includes("/dashboard/search")
  console.log("🚀 ~ isSearchPage:", isSearchPage)
  return ( 
    <SessionProvider session={session} >

    <div className="h-full">
      {/* {isSearchPage && <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
        <Navbar />
      </div>} */}
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <Sidebar />
      </div>
      <main className="md:pl-56 pt-[80px] h-full">
        {children}
      </main>
    </div>
    </SessionProvider>
   );
}
 
export default DashboardLayout;