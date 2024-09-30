
import { redirect } from "next/navigation";

 

import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";

const CategoryPage = async () => {
  const session = await auth();
  const userId = session?.user.id;
  if (!userId) {
    return redirect("/");
  }

  const category = await db.category.findMany({
  
    orderBy: {
      name: "desc",
    },
  });
  console.log("🚀 ~ CoursesPage ~ users:", category)

  return ( 
    <div className="p-6">
      <DataTable columns={columns} data={category} />
    </div>
   );
}
 
export default CategoryPage;