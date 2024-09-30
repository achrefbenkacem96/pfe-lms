'use client';
import React from 'react';
import QuizCard from './QuizCard';
import PlaceHolder from './PlaceHolder';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import DropDown from './DropDown';
import useGlobalContextProvider from '@/context/ContextApi';
import { useSession } from 'next-auth/react';

interface Quiz {
   id: string;
  title: string;
  description: string;
 }

interface UserObject {
  user: {
    isLogged: boolean;
   };
  setUser: React.Dispatch<React.SetStateAction<{ isLogged: boolean }>>;
}

interface IsLoadingObject {
  isLoading: boolean;
}

 

function QuizzesArea() {
  const { allQuizzes, userObject, isLoadingObject } = useGlobalContextProvider();
  const router = useRouter();
  const { user, setUser } = userObject;
  const { isLoading } = isLoadingObject;
  const session = useSession();

  console.log(isLoading);

  return (
    <div className="poppins mx-auto max-w-screen-xl p-4 sm:px-8 sm:py-5 lg:px-10">
      <div>
        { !isLoading ? (
          <>
            {allQuizzes.length === 0 ? (
              (user?.role ==="TEACHER" ? <PlaceHolder /> : <p className='text-center'> No quiz available</p>)
            ) : (
              <div>
                <DropDown />
                <h2 className="text-xl font-bold">My Quizzes</h2>
                <div className="mt-6 flex gap-2 flex-wrap">
                  <div className="flex gap-2 flex-wrap">
                    {allQuizzes.map((singleQuiz, quizIndex) => (
                      <div key={quizIndex}>
                        <QuizCard singleQuiz={singleQuiz} />
                      </div>
                    ))}
                  </div>
                  {user?.role === "TEACHER" && (<div
                    onClick={() => router.push('/dashboard/quiz/quiz-build')}
                    className="cursor-pointer justify-center items-center rounded-[10px]
                    w-[230px] flex flex-col gap-2 border border-gray-100 bg-white p-4"
                  >
                    <Image
                      src={'/quiz/add-quiz.png'}
                      width={160}
                      height={160}
                      alt="Add a new Quiz"
                    />
                    <span className="select-none opacity-40">
                      Add a new Quiz
                    </span>
                  </div>)}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="h-96 flex flex-col gap-4 justify-center items-center">
            <h2 className="font-bold text-5xl">
              Learn 10x <span className="text-green-700">Faster!</span>
            </h2>
            <span className="text-xl font-light">
              Unlock Your Potential with Personalized Quizzes
            </span>
            {/* <button
              onClick={() => {
                setUser((prevUser) => (prevUser && { ...prevUser, isLogged: true }));
              }}
              className="p-4 bg-green-700 text-white rounded-md"
            >
              Get Started Now!
            </button> */}
          </div>
        )}
      </div>
    </div>
  );
}

export default QuizzesArea;
