"use server";
import { db } from "@/lib/db";
import { RegisterSchema } from "@/schemas/register";
import * as  z from "zod";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/token";
import { sendVerificationEmail } from "@/lib/mail";
import { UserRole } from "@prisma/client";


export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validatedFields = RegisterSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }
    const { email, password, name, image, phone, role } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
        return { error: "Email already in use!" }
    }
    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            image,
            phone,
            role: role == "TEACHER" ? UserRole.TEACHER : UserRole.STUDENT
        }
    });
    const verficationToken = await generateVerificationToken(email);
    await sendVerificationEmail(
        verficationToken.email,
        verficationToken.token,
    );
    return { success: "Confirmation email sent!" };
};

