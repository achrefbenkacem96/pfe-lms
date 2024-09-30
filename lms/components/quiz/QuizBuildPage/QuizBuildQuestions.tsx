'use client';

import React, {
  useState,
  useEffect,
  useRef,
  createRef,
  forwardRef,
  useLayoutEffect,
  RefObject,
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import toast, { Toaster } from 'react-hot-toast';
import Choices from './Choices';
import IconsComponents from './IconsComponents';

// Define types for props
interface QuizBuildQuestionsProps {
  focusProp: { focus: boolean; setFocusFirst: React.Dispatch<React.SetStateAction<boolean>> };
  quizQuestions: QuizQuestion[];
  setQuizQuestions: React.Dispatch<React.SetStateAction<QuizQuestion[]>>;
}

interface QuizQuestion {
  id: string;
  mainQuestion: string;
  choices: string[];
  correctAnswer: number;
  answeredResult: number;
  statistics: {
    totalAttempts: number;
    correctAttempts: number;
    incorrectAttempts: number;
  };
}

interface CorrectAnswerProps {
  onChangeCorrectAnswer: (text: string) => void;
  singleQuestion: QuizQuestion;
}

interface SingleQuestionProps {
  questionIndex: number;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const QuizBuildQuestions: React.FC<QuizBuildQuestionsProps> = ({ focusProp, quizQuestions, setQuizQuestions }) => {
  const prefixes = ['A', 'B', 'C', 'D'];
  const { focus, setFocusFirst } = focusProp;
  const endOfListRef = useRef<HTMLDivElement | null>(null);
  const textAreaRefs = useRef<RefObject<HTMLTextAreaElement>[]>(quizQuestions.map(() => createRef()));

  // Function to add a new question
  const addNewQuestion = () => {
    setFocusFirst(false);
    const lastIndexQuizQuestions = quizQuestions.length - 1;

    if (quizQuestions[lastIndexQuizQuestions].mainQuestion.trim().length === 0) {
      toast.error(`The question ${lastIndexQuizQuestions + 1} is still empty!`);
      textAreaRefs.current[lastIndexQuizQuestions].current?.focus();
      return;
    }

    for (const choice of quizQuestions[lastIndexQuizQuestions].choices) {
      const singleChoice = choice.substring(2);
      if (singleChoice.trim().length === 0) {
        return toast.error(`Please ensure that all previous choices are filled out!`);
      }
    }
//@ts-ignore
    if (quizQuestions[lastIndexQuizQuestions].correctAnswer.length === 0) {
      return toast.error(`Please ensure to fill out the correct answer!`);
    }

    const newQuestion: QuizQuestion = {
      id: uuidv4(),
      mainQuestion: '',
      choices: prefixes.slice(0, 2).map((prefix) => prefix + ' '),
      correctAnswer: -1,
      answeredResult: -1,
      statistics: {
        totalAttempts: 0,
        correctAttempts: 0,
        incorrectAttempts: 0,
      },
    };

    setQuizQuestions([...quizQuestions, newQuestion]);
    textAreaRefs.current = [...textAreaRefs.current, createRef()];
  };

  const deleteQuestion = (singleQuestion: QuizQuestion) => {
    const filterQuestionToDelete = quizQuestions.filter(
      (question) => singleQuestion.id !== question.id,
    );

    const updatedRefs = textAreaRefs.current.filter((_, index) => {
      return quizQuestions[index].id !== singleQuestion.id;
    });

    textAreaRefs.current = updatedRefs;
    setQuizQuestions(filterQuestionToDelete);
  };

  const handleInputChange = (index: number, text: string) => {
    const updatedQuestions = quizQuestions.map((question, i) => {
      if (index === i) {
        return { ...question, mainQuestion: text };
      }

      return question;
    });

    setQuizQuestions(updatedQuestions);
  };

  const updateTheChoicesArray = (text: string, choiceIndex: number, questionIndex: number) => {
    const updatedQuestions = quizQuestions.map((question, i) => {
      if (questionIndex === i) {
        const updatedChoices = question.choices.map((choice, j) => {
          if (choiceIndex === j) {
            return prefixes[j] + '. ' + text;
          } else {
            return choice;
          }
        });

        return { ...question, choices: updatedChoices };
      }

      return question;
    });

    setQuizQuestions(updatedQuestions);
  };

  const updateCorrectAnswer = (text: string, questionIndex: number) => {
    const correctAnswersArray = ['A', 'B', 'C', 'D'];

    const questionsCopy = [...quizQuestions];
    //@ts-ignore
    questionsCopy[questionIndex].correctAnswer = correctAnswersArray.indexOf(text).toString();
    setQuizQuestions(questionsCopy);
  };

  useLayoutEffect(() => {
    if (endOfListRef.current && focus) {
      setTimeout(() => {
        endOfListRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [quizQuestions.length, focus]);

  useEffect(() => {
    const lastTextAreaIndex = quizQuestions.length - 1;
    if (lastTextAreaIndex >= 0) {
      const lastTextArea = textAreaRefs.current[lastTextAreaIndex].current;
      if (lastTextArea && focus) {
        lastTextArea.focus();
      }
    }
  }, [quizQuestions.length, focus]);

  return (
    <div className="p-3 mt-6 flex justify-between border border-green-700 rounded-md relative">
      <Toaster
        toastOptions={{
          style: {
            fontSize: '13px',
          },
        }}
      />

      <div className="flex gap-2 flex-col w-full">
        {/* Header Area */}
        <div className="flex gap-2 items-center">
          <div className="bg-green-700 px-4 py-2 rounded-md text-white">2</div>
          <span className="font-bold">Quiz Questions :</span>
        </div>
        {/* Questions Area */}
        {quizQuestions.map((singleQuestion, questionIndex) => (
          <div
            ref={quizQuestions.length - 1 === questionIndex ? endOfListRef : null}
            key={questionIndex}
            className="border ml-5 p-4 mt-4 flex-col border-green-700 border-opacity-50 rounded-md flex justify-center relative"
          >
            <SingleQuestion
              questionIndex={questionIndex}
              value={singleQuestion.mainQuestion}
              ref={textAreaRefs.current[questionIndex]}
              onChange={(e) => handleInputChange(questionIndex, e.target.value)}
            />
            <Choices
              questionIndex={questionIndex}
              singleQuestion={singleQuestion}
              quizQuestions={quizQuestions}
              //@ts-ignore
              setQuizQuestions={setQuizQuestions}
              onChangeChoice={updateTheChoicesArray}
              value={singleQuestion.choices}
              prefixes={prefixes}
            />
            {questionIndex !== 0 && (
              <FontAwesomeIcon
                icon={faXmark}
                width={10}
                height={10}
                className="text-red-600 absolute top-2 right-3 cursor-pointer"
                onClick={() => deleteQuestion(singleQuestion)}
              />
            )}
            <CorrectAnswer
              onChangeCorrectAnswer={(text) => updateCorrectAnswer(text, questionIndex)}
              singleQuestion={singleQuestion}
            />
          </div>
        ))}

        {/* Button Area */}
        <div className="w-full flex justify-center mt-3">
          <button
            onClick={addNewQuestion}
            className="p-3 bg-green-700 rounded-md text-white w-[210px] text-[13px]"
          >
            Add a New Question
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizBuildQuestions;
const CorrectAnswer: React.FC<CorrectAnswerProps> = ({ onChangeCorrectAnswer, singleQuestion }) => {
  //@ts-ignore
  const [correctAnswerInput, setCorrectAnswerInput] = useState<string>(singleQuestion.correctAnswer);
  const prefixes = ['A', 'B', 'C', 'D'];

  const handleOnChangeInput = (text: string) => {
    const upperText = text.toUpperCase();
    for (const choice of singleQuestion.choices) {
      const eachChoice = choice.substring(0, 1);
      if (eachChoice === upperText || upperText === '') {
        setCorrectAnswerInput(upperText);
        onChangeCorrectAnswer(upperText);
        break; // Add a break here to avoid redundant updates
      }
    }
  };

  return (
    <div className="flex gap-1 items-center mt-3">
      <div className="text-[15px]">Correct Answer</div>
      <div className="border border-gray-200 rounded-md p-1 w-full">
        <input
          value={correctAnswerInput} // Update to use correctAnswerInput directly
          maxLength={1}
          onChange={(e) => handleOnChangeInput(e.target.value)}
          className="p-3 outline-none w-full text-[13px]"
          placeholder="Add the correct answer..."
        />
      </div>
    </div>
  );
};

const SingleQuestion = forwardRef<HTMLTextAreaElement, SingleQuestionProps>(
  function SingleQuestion({ questionIndex, value, onChange }, ref) {
    return (
      <div className="w-full mr-5 mt-3">
        <div className="flex items-center gap-3">
          <div className="flex gap-2 text-[15px] border-gray-200">
            <span>Question</span>
            <span>{questionIndex + 1}</span>
          </div>
          <textarea
            className="border border-gray-200 rounded-md p-3 ml-3 w-full h-[50px] resize-none text-[13px] outline-none"
            placeholder="Your Question Here..."
            value={value}
            onChange={onChange}
            ref={ref}
          />
        </div>
      </div>
    );
  }
);

