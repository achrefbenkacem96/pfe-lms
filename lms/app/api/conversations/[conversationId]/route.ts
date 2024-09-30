import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";

import { pusherServer } from "@/lib/pusher";
import { db } from "@/lib/db";

interface IParams {
  conversationId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  try {
    const { conversationId } = params;
    const currentUser = await getCurrentUser();

    if (!currentUser?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Find the conversation with its participants
    const existingConversation = await db.conversation.findUnique({
      where: {
        id: conversationId
      },
      include: {
        participants: {
          include: {
            user: true
          }
        }
      }
    });

    if (!existingConversation) {
      return new NextResponse('Invalid ID', { status: 400 });
    }

    // Check if the current user is part of the conversation
    const userIsParticipant = existingConversation.participants.some(participant => participant.userId === currentUser.id);

    if (!userIsParticipant) {
      return new NextResponse('Forbidden', { status: 403 });
    }

    // Delete the conversation
    await db.conversation.delete({
      where: {
        id: conversationId
      }
    });

    // Notify users of the conversation removal
    existingConversation.participants.forEach((participant) => {
      if (participant.user.email) {
        pusherServer.trigger(participant.user.email, 'conversation:remove', existingConversation);
      }
    });

    return NextResponse.json({ message: 'Conversation deleted' });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return new NextResponse('Internal Error', { status: 500 });
  }
}
