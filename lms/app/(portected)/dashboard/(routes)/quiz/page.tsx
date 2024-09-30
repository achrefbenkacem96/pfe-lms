'use client';
import Navbar from '@/components/quiz/Navbar';
import QuizzesArea from '@/components/quiz/QuizzesArea';
import useGlobalContextProvider from '@/context/ContextApi';
import { useEffect, useState } from 'react';
 
import { Toaster } from 'react-hot-toast';

export default function Home() {
  const { quizToStartObject, selectedQuizObject, userObject } = useGlobalContextProvider();
  console.log("🚀 ~ Home ~ userObject:", userObject)
  const { user } = userObject;
  const { setSelectQuizToStart } = quizToStartObject;
  const { selectedQuiz, setSelectedQuiz } = selectedQuizObject;
  console.log("🚀 ~ Home ~ selectedQuiz:", selectedQuiz)

  useEffect(() => {
    setSelectQuizToStart(null);
    // set the selectedQuiz back to null
    setSelectedQuiz(null);
  }, []);

  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setOpenMenu(false);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call the function once initially to set initial state

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleModeChange = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (

    <div>
      <header>
        <Navbar />
      </header>
      <QuizzesArea />
    </div>
  );
}

 

 
