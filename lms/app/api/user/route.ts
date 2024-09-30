import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

// Define types for request bodies
interface CreateUserRequestBody {
  name: string;
  isLogged: boolean;
  experience: number;
}

interface UpdateUserRequestBody {
  updateUser: {
    isLogged: boolean;
    experience: number;
  };
}

// POST /api/users
export async function POST(request: NextRequest) {

  try {
    // Count the number of documents in the User collection
    const countUsers = await db.user.count();

    if (countUsers > 0) {
      // If at least one user exists, find the first user
      const findUser = await db.user.findFirst();
      console.log("🚀 ~ POST ~ findUser:", findUser);

      // Return the first user to the client
      return NextResponse.json({
        message: 'User already exists',
        user: findUser,
      });
    }

    const { name, isLogged, experience }: CreateUserRequestBody = await request.json();
    const newUser = await db.user.create({data:{ name,  experience }});
    return NextResponse.json({
      user: newUser,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to create user.' }, { status: 500 });
  }
}

// PUT /api/users
export async function PUT(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id');

  if (!id) {
    return NextResponse.json({ message: 'No user ID provided.' }, { status: 400 });
  }

  try {
    let userUpdate = await db.user.findUnique({where:{id}});
    if (!userUpdate) {
      return NextResponse.json({ message: 'User not found.' }, { status: 404 });
    }

    const { updateUser }: { updateUser: UpdateUserRequestBody['updateUser'] } = await request.json();
             //@ts-ignore

    userUpdate.isLogged = updateUser.isLogged;
    userUpdate.experience = updateUser.experience;
         //@ts-ignore
    await userUpdate.save();
    return NextResponse.json({ message: 'User updated successfully.' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to update user.' }, { status: 500 });
  }
}
