import { auth } from "@/auth";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";

import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";

const CoursesPage = async () => {
  const session = await auth();
  const userId = session?.user.id;
  if (!userId) {
    return redirect("/");
  }
     const courses = await db.course.findMany({
      where: {
        ...(session?.user?.role === "ADMIN" ? {} : { userId }), // Conditionally include userId in the where clause

      },
      orderBy: {
        createdAt: "desc",
      },
    });
  

  return ( 
    <div className="p-6">
      <DataTable columns={columns} data={courses} role={session?.user?.role}/>
    </div>
   );
}
 
export default CoursesPage;