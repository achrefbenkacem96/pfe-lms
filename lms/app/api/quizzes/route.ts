import { auth } from '@/auth';
import { db } from '@/lib/db';
import { isTeacher } from '@/lib/teacher';
import { Prisma, Question } from '@prisma/client';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { number } from 'zod';

// Define types for request bodies
interface CreateQuizRequestBody {
  quizTitle: string;
  icon: any;  
  quizQuestions: any[];  
}

interface UpdateQuizRequestBody {
  updateQuiz?: {
    id?: any;  
    icon?: any;  
    quizTitle?: string;
    quizQuestions?: any[]; 
  };
  updateQuizQuestions?: any[];  
}

// POST /api/quizzes
export async function POST(request: NextRequest) {
  const session = await auth();
  const userId = session?.user.id;
  if (!userId || !isTeacher(userId)) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { quizTitle, icon, quizQuestions }: CreateQuizRequestBody = await request.json();

  try {


    const newQuiz = await db.quiz.create({
      data: {
        quizTitle,
        icon,
        userId,
        quizQuestions: {
          create: quizQuestions.map((question) => ({
            id: question.id,
            mainQuestion: question.mainQuestion,
            choices: question.choices as Prisma.InputJsonValue,
            correctAnswer:typeof question.correctAnswer === "number" ? question.correctAnswer : parseInt(question.correctAnswer) ,
            answeredResult: question.answeredResult,
            statistics: {  
              create: {
                userId:userId,
                totalAttempts: question.statistics?.totalAttempts ?? 0,
                correctAttempts: question.statistics?.correctAttempts ?? 0,
                incorrectAttempts: question.statistics?.incorrectAttempts ?? 0,
              },
            },
          })),
        },
      },
    });

    return NextResponse.json({
      id: newQuiz.id,
      message: 'The quiz has been created successfully.',
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to create quiz.' }, { status: 500 });
  }
}

// GET /api/quizzes
export async function GET() {
  try {
    const session = await auth();
    const userId = session?.user.id;
    const quizzes = await db.quiz.findMany({
      include: {
        quizQuestions: {
          include: {
            statistics: {
              where: {
                userId: userId, 
              },
            },
          },
        },
      },
    });
    return NextResponse.json({ quizzes });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to fetch quizzes.' }, { status: 500 });
  }
}

// PUT /api/quizzes
export async function PUT(request: NextRequest) {
  const session = await auth();
  const userId = session?.user.id;


  const id = request.nextUrl.searchParams.get('id');
  const { updateQuiz, updateQuizQuestions }: UpdateQuizRequestBody = await request.json();
  console.log("🚀 ~ PUT ~ updateQuizQuestions:", updateQuizQuestions)

  if (!id) {
    return NextResponse.json({ message: 'No quiz ID provided.' }, { status: 400 });
  }

  try {
 if (updateQuizQuestions) {
  
   for (const question of updateQuizQuestions) {
     const stats = await db.statistics.findUnique({
       //@ts-ignore
       where: { 
         userId:userId,
         questionId: question.id,
         
        }  
     })
     if (stats) {
       const statistics = await db.statistics.update({
         where: { 
           id:question.statistics.id,
           userId:userId,
           questionId: question.id,
          } , 
          data: {
           questionId: question.id,
           userId:userId,
           totalAttempts: question.statistics.totalAttempts,
           correctAttempts: question.statistics.correctAttempts,
           incorrectAttempts: question.statistics.incorrectAttempts,
          }
        });
        
      }else{
        const statistics = await db.statistics.create({
         //@ts-ignore
         data: {
           questionId: question.id,
           userId:userId,
           totalAttempts: question.statistics.totalAttempts,
           correctAttempts: question.statistics.correctAttempts,
           incorrectAttempts: question.statistics.incorrectAttempts,
         }
       });
 
     }
 
      
   }
 }
 return NextResponse.json({ message: 'Quiz updated successfully.' });
 

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to update quiz.' }, { status: 500 });
  }
}



// DELETE /api/quizzes
export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id');

  try {
    if (!id) {
      return NextResponse.json({ message: 'No quiz ID provided.' }, { status: 400 });
    }

    await db.quiz.delete({ where: { id } });
    return NextResponse.json({ message: 'Quiz deleted successfully.' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to delete quiz.' }, { status: 500 });
  }
}
