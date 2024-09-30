import { NextResponse } from "next/server";

import getCurrentUser from "@/actions/getCurrentUser";
import { pusherServer } from '@/lib/pusher';
import { db } from "@/lib/db";
 
export async function POST(
  request: Request,
) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const {
      message,
      image,
      conversationId
    } = body;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Create a new message
    const newMessage = await db.message.create({
      data: {
        body: message,
        image: image,
        conversation: {
          connect: { id: conversationId }
        },
        sender: {
          connect: { id: currentUser.id }
        },
        seen: {
          connect: {
            id: currentUser.id
          }
        },
      },
      include: {
        sender: true,
        seen: true,
      }
    });

    // Update the conversation with the new message
    const updatedConversation = await db.conversation.update({
      where: {
        id: conversationId
      },
      data: {
        lastMessageAt: new Date(),
        messages: {
          connect: {
            id: newMessage.id
          }
        }
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

    // Notify all participants of the new message
    await pusherServer.trigger(conversationId, 'messages:new', newMessage);

    // Notify each participant about the updated conversation
    updatedConversation.participants.forEach((participant) => {
      if (participant.user.email && participant.user.id !== currentUser.id) {
        pusherServer.trigger(participant.user.email, 'conversation:update', {
          id: conversationId,
          messages: [newMessage]
        });
      }
    });

    return NextResponse.json(newMessage);
  } catch (error) {
    console.error('ERROR_MESSAGES', error);
    return new NextResponse('Error', { status: 500 });
  }
}
