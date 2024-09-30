import getCurrentUser from "./getCurrentUser";
import { db } from "@/lib/db";

const getConversations = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser?.id) {
    return [];
  }

  try {
    const conversations = await db.conversation.findMany({
      orderBy: {
        lastMessageAt: 'desc',
      },
      where: {
        participants: {
          some: {
            userId: currentUser.id
          }
        }
      },
      include: {
        participants: {
          include: {
            user: true,  
          }
        },
        messages: {
          include: {
            sender: true,
            seen: true,
          }
        },
      }
    });
 
    return conversations;
  } catch (error: any) {
    console.error("Error fetching conversations:", error);
    return [];
  }
};

export default getConversations;
