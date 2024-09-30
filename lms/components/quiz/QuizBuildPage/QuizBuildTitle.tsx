'use client';

import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode } from '@fortawesome/free-solid-svg-icons';
import useGlobalContextProvider from '@/context/ContextApi';
import convertToFaIcons from '@/lib/convertToFaIcons';
// Define the props type for the component
interface QuizBuildTitleProps {
  focusProp: { focus: boolean };
  onChangeQuizTitle: (title: string) => void;
}

  

function QuizBuildTitle({ focusProp, onChangeQuizTitle }: QuizBuildTitleProps) {
  const { openBoxToggle, selectedIconObject, selectedQuizObject } = useGlobalContextProvider();
  const { selectedQuiz } = selectedQuizObject;
  const [quizTitle, setQuizTitle] = useState<string>(() => {
    return selectedQuiz ? selectedQuiz.quizTitle : '';
  });
  const { focus } = focusProp;
  const quizTitleRef = useRef<HTMLInputElement>(null);

  const { openIconBox, setOpenIconBox } = openBoxToggle;
  const { selectedIcon, setSelectedIcon } = selectedIconObject ;

  function handleTextInputChange(text: string) {
    setQuizTitle(text);
    onChangeQuizTitle(text);
  }

  useEffect(() => {
    if (focus && quizTitleRef.current) {
      quizTitleRef.current.focus();
    }
  }, [focus]);

  useEffect(() => {
    if (typeof selectedIcon.faIcon === 'string') {
      const newFaIcon = convertToFaIcons(selectedIcon.faIcon);
      const copySelectedIcon = { ...selectedIcon, faIcon: newFaIcon };
      setSelectedIcon(copySelectedIcon);
    }
  }, [selectedIcon, setSelectedIcon]);

  return (
    <div className="p-3 flex justify-between border border-green-700 rounded-md">
      <div className="flex gap-2">
        <div className="flex gap-2 items-center">
          <div className="bg-green-700 px-4 py-1 rounded-md text-white">1</div>
          <span className="font-bold">Quiz Name : </span>
        </div>
        <input
          onChange={(e) => handleTextInputChange(e.target.value)}
          value={quizTitle}
          ref={quizTitleRef}
          className="outline-none border-b-2 pt-1 w-[300px] text-[13px]"
          placeholder="Enter the Name Of The Quiz..."
        />
      </div>
      <FontAwesomeIcon
        onClick={() => setOpenIconBox(true)}
        icon={selectedIcon.faIcon}
        height={40}
        width={40}
        className="text-white p-2 rounded-md bg-green-700 cursor-pointer"
      />
    </div>
  );
}

export default QuizBuildTitle;
