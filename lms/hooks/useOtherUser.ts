import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { FullConversationType } from "../types";
import { User } from "@prisma/client";

const useOtherUser = (conversation: FullConversationType | { users: User[],   participants: any[]; } | null) => {
  const { data: session, status } = useSession();
  
  const otherUser = useMemo(() => {
    // Return null if the session is still loading or there is no session data
    if (status === "loading" || !session || !session.user || !conversation) {
      return null;
    }

    const currentUserEmail = session.user.email;

    // Ensure that participants are available
    const participants = conversation?.participants;
    if (!participants) {
      return null;
    }

    // Filter users to find the one who is not the current user
    const filteredUsers = participants.filter(participant => participant?.user?.email !== currentUserEmail);

    // Return the first other user if exists
    return filteredUsers.length > 0 ? filteredUsers[0].user : null;
  }, [status, session, conversation]);

  return otherUser;
};

export default useOtherUser;
