'use client';

import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { faCode } from '@fortawesome/free-solid-svg-icons';
import useGlobalContextProvider from '@/context/ContextApi';
import IconsComponents from '@/components/quiz/QuizBuildPage/IconsComponents';
import QuizBuildNav from '@/components/quiz/QuizBuildPage/QuizBuildNav';
import QuizBuildQuestions from '@/components/quiz/QuizBuildPage/QuizBuildQuestions';
import QuizBuildTitle from '@/components/quiz/QuizBuildPage/QuizBuildTitle';

// Define types for quiz questions and quiz
interface Statistics {
  totalAttempts: number;
  correctAttempts: number;
  incorrectAttempts: number;
}

interface QuizQuestion {
  id: string;
  mainQuestion: string;
  choices: string[];
  correctAnswer: number;
  answeredResult: number;
  statistics: Statistics;
}

interface Quiz {
  id: string;
  icon: any; // Replace `any` with the actual type for icon if available
  quizTitle: string;
  quizQuestions: QuizQuestion[];
}

// Define types for the context objects
interface SelectedIconObject {
  selectedIcon: { faIcon: any }; // Replace `any` with the actual type for faIcon
}

interface SelectedQuizObject {
  selectedQuiz: Quiz | null;
}

interface GlobalContextProvider {
  selectedIconObject: SelectedIconObject;
  selectedQuizObject: SelectedQuizObject;
}

function Page() {
  const prefixes = ['A', 'B', 'C', 'D'];
  const { selectedIconObject, selectedQuizObject } = useGlobalContextProvider() as GlobalContextProvider;
  const { selectedIcon } = selectedIconObject;
  const { selectedQuiz } = selectedQuizObject;
  const [focusFirst, setFocusFirst] = useState<boolean>(true);
//@ts-ignore
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>(() => {
    if (selectedQuiz) {
      return selectedQuiz.quizQuestions;
    } else {
      return [
        {
          id: uuidv4(),
          mainQuestion: '',
          choices: prefixes.slice(0, 2).map((prefix) => prefix + '. '),
          correctAnswer: '',
          answeredResult: -1,
          statistics: {
            totalAttempts: 0,
            correctAttempts: 0,
            incorrectAttempts: 0,
          },
        },
      ];
    }
  });

  const [newQuiz, setNewQuiz] = useState<Quiz>(() => {
    if (selectedQuiz) {
      return selectedQuiz;
    } else {
      return {
        id: '',
        icon: selectedIcon.faIcon,
        quizTitle: 'Title',
        quizQuestions: quizQuestions,
      };
    }
  });

  console.log("🚀 ~ Page ~ newQuiz:", newQuiz)

  useEffect(() => {
    setNewQuiz((prevQuiz) => ({
      ...prevQuiz,
      icon: selectedIcon.faIcon,
      quizQuestions: quizQuestions,
    }));
  }, [quizQuestions, selectedIcon.faIcon]);

  function onChangeQuizTitle(text: string) {
    setNewQuiz((prevQuiz) => ({ ...prevQuiz, quizTitle: text }));
  }

  const quizNavBarProps = {
    quizQuestions,
    newQuiz,
    setNewQuiz,
  };

  const quizTitleProps = {
    focusProp: { focus: focusFirst, setFocusFirst },
    onChangeQuizTitle,
  };

  const quizQuestionsProps = {
    focusProp: { focus: !focusFirst, setFocusFirst },
    quizQuestions,
    setQuizQuestions,
  };

  return (
    <div className="relative mx-16 poppins">
      <IconsComponents />
      {// @ts-ignore
      <QuizBuildNav {...quizNavBarProps} />}
      <QuizBuildTitle {...quizTitleProps} />
      <QuizBuildQuestions {...quizQuestionsProps} />
    </div>
  );
}

export default Page;
