'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import useGlobalContextProvider from '@/context/ContextApi';
 

function PlaceHolder() {
  const { userObject } = useGlobalContextProvider();
  const { user, setUser } = userObject ; // Type cast if needed
  const router = useRouter();

  return (
    <div className="poppins flex-col gap-3 p-4 flex justify-center items-center">
      {/* Icon Container */}
      <Image src="/quiz/emptyBox.png" alt="" width={130} height={130} />
      {/* Title */}
      <h2 className="text-2xl font-bold">Quizzes await! Make one.</h2>
      {/* Call To Action */}
      <span className="text-[13px] font-light">
        Click below to begin your journey here...
      </span>
      {/* Button */}
      <button
        onClick={() => {
          router.push('/dashboard/quiz/quiz-build');
        }}
        className="p-3 px-4 text-white text-[12px] bg-green-700 rounded-md"
      >
        Create my first Quiz
      </button>
    </div>
  );
}

export default PlaceHolder;
