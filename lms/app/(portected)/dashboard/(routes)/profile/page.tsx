
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import FormProfile from "./_components/form-profile";



  
const Profile = async() => {
    
  const session = await auth();
  const userId = session?.user.id;
  if (!userId) {
    return redirect("/");
  }

  const user = await db.user.findUnique({
  
    where: {
      id: userId,
    },
  });
  console.log("🚀 ~ CoursesPage ~ users:", user)
  if (!user) {
    return redirect("/");
  }

  return ( 
    <div>
     <FormProfile initialData={user} />
  </div>
   );
}
 
export default Profile;