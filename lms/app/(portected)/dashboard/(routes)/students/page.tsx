
import { redirect } from "next/navigation";

 

import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";



const CoursesPage = async () => {
  const session = await auth();
  const userId = session?.user.id;
  if (!userId) {
    return redirect("/");
  }

  const users = await db.user.findMany({
    where: {
      role: UserRole.STUDENT,
    },
    orderBy: {
      name: "desc",
    },
  });
  console.log("🚀 ~ CoursesPage ~ users:", users)

  return ( 
    <div className="p-6">
      <DataTable columns={columns} data={users} />
    </div>
   );
}
 
export default CoursesPage;