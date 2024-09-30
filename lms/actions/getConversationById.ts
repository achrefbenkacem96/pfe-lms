import { db } from "@/lib/db";
import getCurrentUser from "./getCurrentUser";

const getConversationById = async (
  conversationId: string
) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      return null;
    }

    // Fetch the conversation with its participants
    const conversation = await db.conversation.findUnique({
      where: {
        id: conversationId
      },
      include: {
        participants: {
          include: {
            user: true  
          }
        },
        messages: {
          include: {
            seen: true 
          }
        }
      }
    });

    // Check if the current user is a participant in the conversation
    if (!conversation || !conversation.participants.some(participant => participant.user.id === currentUser.id)) {
      return null;
    }

    return conversation;
  } catch (error: any) {
    console.error('SERVER_ERROR', error);
    return null;
  }
};

export default getConversationById;
