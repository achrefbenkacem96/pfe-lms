'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import useGlobalContextProvider from '@/context/ContextApi';
import { useSession } from 'next-auth/react';

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = (props) => {
  const { userObject, userXpObject } = useGlobalContextProvider();
  const { data } = useSession();
  const { user, setUser } = userObject;
  const [isLoading, setIsLoading] = useState(false);

  // Update user state when session data changes
  useEffect(() => {
    if (data?.user) {
               //@ts-ignore
      setUser(data.user);
    }
  }, [data, setUser]);

  return (
    <nav className="poppins mx-auto max-w-screen-xl p-4 sm:px-8 sm:py-5 lg:px-10">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div className="text-center sm:text-left">
          <a className="flex gap-1 items-center">
            <Image
              src="/quiz/quizSpark_icon.png"
              alt="Quiz Spark Icon"
              width={60}
              height={60}
            />
            <h2 className="text-2xl font-bold flex gap-2">
              Quiz 
            </h2>
          </a>
        </div>

        <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
          {user?.role === "STUDENT" && (
            <div className="flex gap-2">
              <span>Welcome: {user.name}</span>
              <span className="font-bold text-green-700">
                {user.experience} XP
              </span>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
