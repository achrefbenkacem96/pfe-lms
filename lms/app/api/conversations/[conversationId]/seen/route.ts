import { NextResponse } from "next/server";

import getCurrentUser from "@/actions/getCurrentUser";
import { pusherServer } from '@/lib/pusher';
import { db } from "@/lib/db";
interface IParams {
  conversationId?: string;
}

export async function POST(
  request: Request,
  { params }: { params: IParams }
) {
  try {
    const currentUser = await getCurrentUser();
    const { conversationId } = params;

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Find existing conversation
    const conversation = await db.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        messages: {
          include: {
            seen: true
          },
        },
        participants: {
          include: {
            user: true
          }
        }
      },
    });

    if (!conversation) {
      return new NextResponse('Invalid ID', { status: 400 });
    }

    // Find last message
    const lastMessage = conversation.messages[conversation.messages.length - 1];

    if (!lastMessage) {
      return NextResponse.json(conversation);
    }

    // Update seen status of the last message
    const updatedMessage = await db.message.update({
      where: {
        id: lastMessage.id,
      },
      include: {
        sender: true,
        seen: true,
      },
      data: {
        seen: {
          connect: {
            id: currentUser.id
          }
        }
      }
    });

    // Check if the user has already seen the message
    const hasSeen = updatedMessage.seen.some(seenUser => seenUser.id === currentUser.id);

    if (hasSeen) {
      return NextResponse.json(conversation);
    }

    // Notify the current user about the updated message
    await pusherServer.trigger(currentUser.email, 'conversation:update', {
      id: conversationId,
      messages: [updatedMessage]
    });

    // Notify all participants about the updated message
    conversation.participants.forEach(async (participant) => {
      if (participant.user.email && participant.user.id !== currentUser.id) {
        await pusherServer.trigger(participant.user.email, 'message:update', updatedMessage);
      }
    });

    return new NextResponse('Success');
  } catch (error) {
    console.error(error, 'ERROR_MESSAGES_SEEN');
    return new NextResponse('Error', { status: 500 });
  }
}
