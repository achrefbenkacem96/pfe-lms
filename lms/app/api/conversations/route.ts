import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";

import { pusherServer } from "@/lib/pusher";
import { db } from "@/lib/db";

export async function POST(
  request: Request,
) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const {
      userId,
      isGroup,
      members,
      name
    } = body;
      console.log("🚀 ~ name:", name)

    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 400 });
    }

    if (isGroup && (!members || members.length < 2 || !name)) {
      return new NextResponse('Invalid data', { status: 400 });
    }

    if (isGroup) {
      const newConversation = await db.conversation.create({
        data: {
          name,
          isGroup,
          participants: {
            create: [
              ...members.map((member: { value: string }) => ({
                user: {
                  connect: {
                    id: member.value
                  }
                }
              })),
              {
                user: {
                  connect: {
                    id: currentUser.id
                  }
                }
              }
            ]
          }
        },
        include: {
          participants: {
            include: {
              user: true
            }
          }
        }
      });

      // Update all connections with the new conversation
      newConversation.participants.forEach((participant) => {
        if (participant.user.email) {
          pusherServer.trigger(participant.user.email, 'conversation:new', newConversation);
        }
      });

      return NextResponse.json(newConversation);
    }

    const existingConversations = await db.conversation.findMany({
      where: {
        isGroup: false,
        participants: {
          every: {
            userId: {
              in: [currentUser.id, userId]
            }
          }
        }
      },
      include: {
        participants: {
          include: {
            user: true
          }
        }
      }
    });

    const singleConversation = existingConversations[0];

    if (singleConversation) {
      return NextResponse.json(singleConversation);
    }
    const user = await db.user.findFirst({
      where: {
        id: userId,
      }
    });
    const newConversation = await db.conversation.create({
      data: {
        isGroup: false,
        participants: {
          create: [
            {
              user: {
                connect: {
                  id: currentUser.id
                }
              }
            },
            {
              user: {
                connect: {
                  id: userId
                }
              }
            }
          ]
        }
      },
      include: {
        participants: {
          include: {
            user: true
          }
        }
      }
    });

    // Update all connections with the new conversation
    newConversation.participants.forEach((participant) => {
      if (participant.user.email) {
        pusherServer.trigger(participant.user.email, 'conversation:new', newConversation);
      }
    });

    return NextResponse.json(newConversation);
  } catch (error) {
    console.error(error); // Added error logging for debugging
    return new NextResponse('Internal Error', { status: 500 });
  }
}
