'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { faQuestion, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import { Quiz, User } from '@prisma/client';
import { useSession } from 'next-auth/react';

 
interface GlobalContextType {
  allQuizzes: Quiz[];
  setAllQuizzes: React.Dispatch<React.SetStateAction<Quiz[]>>;
  quizToStartObject: {
    selectQuizToStart: Quiz | null;
    setSelectQuizToStart: React.Dispatch<React.SetStateAction<Quiz | null>>;
  };
  userObject: {
    user: User | null; // Update here
    setUser: React.Dispatch<React.SetStateAction<User | null>>; // Update here
  };
  openBoxToggle: {
    openIconBox: boolean;
    setOpenIconBox: React.Dispatch<React.SetStateAction<boolean>>;
  };
  selectedIconObject: {
    selectedIcon: { faIcon: IconDefinition };
    setSelectedIcon: React.Dispatch<React.SetStateAction<{ faIcon: IconDefinition }>>;
  };
  dropDownToggleObject: {
    dropDownToggle: boolean;
    setDropDownToggle: React.Dispatch<React.SetStateAction<boolean>>;
  };
  threeDotsPositionsObject: {
    threeDotsPositions: { x: number; y: number };
    setThreeDotsPositions: React.Dispatch<React.SetStateAction<{ x: number; y: number }>>;
  };
  selectedQuizObject: {
    selectedQuiz: Quiz | null;
    setSelectedQuiz: React.Dispatch<React.SetStateAction<Quiz | null>>;
  };
  userXpObject: {
    userXP: number;
    setUserXP: React.Dispatch<React.SetStateAction<number>>;
  };
  isLoadingObject: {
    isLoading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  };
}


const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

interface ContextProviderProps {
  children: ReactNode;
}

export function ContextProvider({ children }: ContextProviderProps) {
  const { data } = useSession();
  const [allQuizzes, setAllQuizzes] = useState<Quiz[]>([]);
  const [selectQuizToStart, setSelectQuizToStart] = useState<Quiz | null>(null);
  // @ts-ignore
  const [user, setUser] = useState<User| null>(data?.user);
  const [openIconBox, setOpenIconBox] = useState<boolean>(false);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [selectedIcon, setSelectedIcon] = useState<{ faIcon: IconDefinition }>({ faIcon: faQuestion });

  const [dropDownToggle, setDropDownToggle] = useState<boolean>(false);
  const [threeDotsPositions, setThreeDotsPositions] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isLoading, setLoading] = useState<boolean>(true);

  const [userXP, setUserXP] = useState<number>(0);

  useEffect(() => {
    // Fetch all quizzes
    const fetchAllQuizzes = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3000/api/quizzes', {
          cache: 'no-cache',
        });

        if (!response.ok) {
          toast.error('Something went wrong...');
          throw new Error('fetching failed...');
        }

        const quizzesData = await response.json();

        setAllQuizzes(quizzesData.quizzes);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllQuizzes();
  },[]);



  useEffect(() => {
    if (selectedQuiz) {
      //@ts-ignore
      setSelectedIcon({ faIcon: selectedQuiz.icon });
    } else {
      setSelectedIcon({ faIcon: faQuestion });
    }
  }, [selectedQuiz]);

  return (
    <GlobalContext.Provider
      value={{
        allQuizzes,
        setAllQuizzes,
        quizToStartObject: { selectQuizToStart, setSelectQuizToStart },
        userObject: { user, setUser },
        openBoxToggle: { openIconBox, setOpenIconBox },
        selectedIconObject: { selectedIcon, setSelectedIcon },
        dropDownToggleObject: { dropDownToggle, setDropDownToggle },
        threeDotsPositionsObject: { threeDotsPositions, setThreeDotsPositions },
        selectedQuizObject: { selectedQuiz, setSelectedQuiz },
        userXpObject: { userXP, setUserXP },
        isLoadingObject: { isLoading, setLoading },
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export default function useGlobalContextProvider() {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error('useGlobalContextProvider must be used within a ContextProvider');
  }
  return context;
}
