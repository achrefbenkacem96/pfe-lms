import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const startDate = req.nextUrl.searchParams.get('startDate');
  const endDate = req.nextUrl.searchParams.get('endDate');
  const name = req.nextUrl.searchParams.get('name');
  console.log("🚀 ~ GET ~ name:", name)

 
 
   const purchases = await db.purchase.findMany({
      where: {
        ...(name && {
          user: {
            name: {
              contains: name,
             },
          },
        }),
        ...(startDate && endDate && {
          createdAt: {
            gte: new Date(startDate),
            lte: new Date(endDate),
          },
        }),
      },
      include: {
        course: {
          include:{
            user:true,
          }
        },
        user: true,
      },
    });
    // console.log("🚀 ~ GET ~ purchases:", purchases)
 
  return NextResponse.json(purchases);
}
