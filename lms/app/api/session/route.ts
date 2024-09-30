import { auth } from '@/auth';
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
 
export async function GET( ) {
  try {
    const session = await auth();  
    
    if (session) {
      return NextResponse.json(session);

    } else {
       return new NextResponse(`Not authenticated`, { status: 401 })
     }
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
   }
}
