// import { auth } from "@/auth"
import { redirect } from "next/navigation";
import { CheckCircle, Clock } from "lucide-react";

import { getDashboardCourses } from "@/actions/get-dashboard-courses";
import { CoursesList } from "@/components/courses-list";

import { InfoCard } from "./_components/info-card";
import { auth } from "@/auth";

export default async function Dashboard() {
  const session = await auth();
   
  if (!session?.user.id) {
    return redirect("/");
  }

  if (session?.user.role === "TEACHER" || session?.user.role === "ADMIN" ) {
    return redirect("/dashboard/teacher/analytics");
  }
  if (session?.user.role === "SUPPORT") {
    return redirect("/dashboard/conversations");
  }
  const {
    completedCourses,
    coursesInProgress
  } = await getDashboardCourses(session?.user.id);

  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
       <InfoCard
          icon={Clock}
          label="In Progress"
          numberOfItems={coursesInProgress.length}
       />
       <InfoCard
          icon={CheckCircle}
          label="Completed"
          numberOfItems={completedCourses.length}
          variant="success"
       />
      </div>
      <CoursesList
        items={[...coursesInProgress, ...completedCourses]}
      />
    </div>
  )
}
