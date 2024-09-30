'use client';

import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import useGlobalContextProvider from '@/context/ContextApi';
import { Quiz } from '@prisma/client';

interface MenuItem {
  name: string;
  icon: any;  
}

 

const DropDown: React.FC = () => {
  const {
    dropDownToggleObject,
    threeDotsPositionsObject,
    selectedQuizObject,
    allQuizzes,
    setAllQuizzes,
  } = useGlobalContextProvider();
  
  const { dropDownToggle, setDropDownToggle } = dropDownToggleObject;
  const { threeDotsPositions } = threeDotsPositionsObject;
  const { selectedQuiz, setSelectedQuiz } = selectedQuizObject ;

  const [isDialogOpened, setIsDialogOpened] = useState<boolean>(false);
  const dropDownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const menuItems: MenuItem[] = [
    { name: 'Modify', icon: faPencil },
    { name: 'Delete', icon: faTrash },
  ];

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(event.target as Node)
      ) {
        if (!isDialogOpened) {
          setSelectedQuiz(null);
        }
        setDropDownToggle(false);
      }
    }

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [dropDownToggle, isDialogOpened, setDropDownToggle, setSelectedQuiz]);

  async function deleteTheQuiz() {
    if (!selectedQuiz) return;

    const updatedAllQuizzes = allQuizzes.filter((quiz: Quiz) => quiz.id !== selectedQuiz.id);

    console.log(selectedQuiz.id);

    const res = await fetch(
      `http://localhost:3000/api/quizzes?id=${selectedQuiz.id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!res.ok) {
      toast.error('Error while deleting the quiz');
      return;
    }

    setAllQuizzes(updatedAllQuizzes);
    toast.success('The Quiz has been deleted successfully.');
    setIsDialogOpened(false);
    setSelectedQuiz(null);
  }

  function handleClickedItem(menuItem: MenuItem) {
    if (menuItem.name === 'Modify') {
      router.push('/dashboard/quiz/quiz-build');
    }

    if (menuItem.name === 'Delete') {
      setIsDialogOpened(true);
      toast(
        (t) => (
          <div className="flex flex-col gap-4">
            <div>
              Do you really want to delete ({selectedQuiz?.quizTitle}) Quiz?
            </div>
            <div className="w-full flex gap-3 justify-center">
              <button
                onClick={() => {
                  deleteTheQuiz();
                  toast.dismiss(t.id);
                }}
                className="bg-green-700 text-white p-1 w-[100px] rounded-md"
              >
                Yes
              </button>
              <button
                className="bg-white text-green-700 p-1 w-[100px] border border-green-700 rounded-md hover:text-white hover:bg-green-700"
                onClick={() => {
                  toast.dismiss(t.id);
                }}
              >
                No
              </button>
            </div>
          </div>
        ),
        {
          duration: 10000,
          id: 'deleteQuiz',
        }
      );
    }

    setDropDownToggle(false);
  }

  return (
    <div
      style={{ left: threeDotsPositions.x, top: threeDotsPositions.y }}
      ref={dropDownRef}
      className={`p-4 w-32 fixed z-50 shadow-md flex rounded-lg flex-col gap-3 bg-white poppins poppins-light text-[13px] ${
        dropDownToggle ? 'visible' : 'invisible'
      }`}
    >
      {menuItems.map((menuItem, index) => (
        <div
          onClick={() => handleClickedItem(menuItem)}
          key={index}
          className="flex gap-2 items-center border text-green-700 border-gray-200 rounded-md p-3 select-none cursor-pointer hover:text-white hover:bg-green-700"
        >
          <FontAwesomeIcon className="size-4" icon={menuItem.icon} />
          <div>{menuItem.name}</div>
        </div>
      ))}
    </div>
  );
};

export default DropDown;
