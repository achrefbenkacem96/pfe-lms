import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { auth } from "@/auth";


 

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const session = await auth();
    const userId = session?.user.id;
    const { courseId } = params;
    const values = await req.json();
    console.log("🚀 ~ values:", values)

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await db.course.update({
      where: {
        id: courseId,
        
      },
      data: {
        enable: values.enable,
      }
    });

    return NextResponse.json(course);
  } catch (error) {
    console.log("[COURSE_ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}