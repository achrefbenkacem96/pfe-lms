import NextAuth from "next-auth"
import authConfig from "@/auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter"

import { db } from "./lib/db"
import { getUserById } from "./data/user"
import { UserRole } from "@prisma/client"



export const { auth, handlers, signIn, signOut } = NextAuth({
    pages:{
        signIn: "/login",
        error: "/error",
    },
    events: {
        async linkAccount({ user }) {
            await db.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() }
            })
        }
        },
        callbacks: {
            async signIn({ user, account }) {

                if (account?.provider !== "credentials") return true;

                const existingUser = user.id && await getUserById(user.id);
                
                if (!existingUser || !existingUser.emailVerified) {
                    return false
                }
                return true;
            },
            async session({ token, session }) {
          
                if (token.sub && session.user) {
                    session.user.id = token.sub;
                             //@ts-ignore
                    session.user.experience = token.experience;
                             //@ts-ignore
                    session.user.image = token.image;
                    session.userId = token.sub;
                  
                }
                if (token.role && session.user) {
                    session.user.role = token.role as UserRole;
                }
                return session;
            },
            async jwt({ token }) {
                if (!token.sub) return token;
                const existingUser = await getUserById(token.sub);
                if (!existingUser)
                    return token;
                token.role = existingUser.role;
                token.experience = existingUser.experience;
                token.image = existingUser.image;

                // console.log({ token })

                return token;
            },
        },
        adapter: PrismaAdapter(db),
        session: { strategy: "jwt" },
        
        ...authConfig,
    })