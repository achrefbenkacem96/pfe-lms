'use client';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import {
  faCode,
  faEllipsis,
  faPlay,
  faQuestion,
} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

import { icon } from '@fortawesome/fontawesome-svg-core';
import useGlobalContextProvider from '@/context/ContextApi';
import convertToFaIcons from '@/lib/convertToFaIcons';
import { Question, Quiz } from '@prisma/client';

// Define the types for Question and Quiz

// Define the type for QuizCard props
interface QuizCardProps {
  singleQuiz: Quiz;
}

function successRate(singleQuiz: Quiz): number {
  let correctQuestions = 0;
  let totalAttempts = 0;
  let successRate = 0;
           //@ts-ignore
  singleQuiz.quizQuestions?.forEach((question: any) => {
    totalAttempts += question.statistics[0]?.totalAttempts;
    correctQuestions += question.statistics[0]?.correctAttempts;
  });

  successRate = totalAttempts > 0 ? Math.ceil((correctQuestions / totalAttempts) * 100) : 0;
  return successRate;
}

const QuizCard: React.FC<QuizCardProps> = ({ singleQuiz }) => {
  console.log("🚀 ~ singleQuiz:", singleQuiz)
  const {
    quizToStartObject,
    dropDownToggleObject,
    threeDotsPositionsObject,
    selectedQuizObject,
    userObject
  } = useGlobalContextProvider();
  const { setDropDownToggle } = dropDownToggleObject;
  const { setSelectQuizToStart } = quizToStartObject;
  const { setThreeDotsPositions } = threeDotsPositionsObject;
  const { selectedQuiz, setSelectedQuiz } = selectedQuizObject;
  const { user } = userObject;
//@ts-ignore
  const { quizTitle, quizQuestions, icon } = singleQuiz;

  const totalQuestions = quizQuestions?.length;
  const globalSuccessRate = successRate(singleQuiz);

  function openDropDownMenu(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const xPos = event.clientX;
    const yPos = event.clientY;

    setThreeDotsPositions({ x: xPos, y: yPos });

    event.stopPropagation();
    setDropDownToggle(true);
    setSelectedQuiz(singleQuiz);
  }

  return (
    <div className="rounded-[10px] flex flex-col gap-2 border border-gray-300 bg-white p-4">
      {/* Image Container */}
      <div className="relative bg-green-700 w-full h-32 flex justify-center items-center rounded-md">
        {/* More Options Icon */}
        {user?.role === "TEACHER" && ( <div className="absolute cursor-pointer top-3 right-3">
          <FontAwesomeIcon
            className="text-white"
            height={13}
            width={13}
            icon={faEllipsis}
            //@ts-ignore
            onClick={openDropDownMenu}
          />
        </div>)}
        {/* Quiz Icon */}
        <FontAwesomeIcon
          className="text-white text-3xl"
          width={120}
          height={120}
          icon={convertToFaIcons(icon)}
        />
      </div>
      {/* Title Area */}
      <h3 className="font-bold">{quizTitle}</h3>
      {/* Questions */}
      <p className="text-sm font-light">{totalQuestions} question(s)</p>
      {/* Footer Area */}
      <div className="flex gap-3">
        {/* Success rate area */}
        {user?.role !== "TEACHER" && (<div className="flex gap-1 items-center">
          <Image src="/quiz/target-777.png" width={20} height={10} alt="Success rate icon" />
          <span className="text-[12px]">
            Success rate: {globalSuccessRate}%
          </span>
        </div>)}
        <div
          onClick={() => {
            setSelectQuizToStart(singleQuiz);
          }}
          className="rounded-full w-7 h-7 bg-green-700 flex items-center justify-center cursor-pointer"
        >
          <Link href="/dashboard/quiz/quiz-start">
            <FontAwesomeIcon
              className="text-white"
              width={15}
              height={15}
              icon={faPlay}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default QuizCard;
