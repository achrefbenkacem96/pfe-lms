"use server";
import { db } from "@/lib/db";
import * as  z from "zod";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/token";
import { sendVerificationEmail } from "@/lib/mail";
import { CreateSchema, UserSchema } from "@/schemas/user";
import { User } from "@prisma/client";
import toast from "react-hot-toast";

const deleteSchema = z.object({
    id: z.string().min(1, {
        message: "User id is required",
        })
  });

export const update = async (values: z.infer<typeof UserSchema>) => {
    const validatedFields = UserSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }
    const { email, password, name, userId } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    await db.user.update({
        where: { id: userId },
        data: {
            name,
            email,
            password: hashedPassword,
        },
       
    });

    return { success: "Update successful" };
};
export const updateProfile = async (values:any, user:User) => {
    const isMatch =  user?.password && await bcrypt.compare(values.newpassword, user?.password);
      
          if (!isMatch) {
           return { error: "Password does not match." } ;
          }
          const hashedPassword = await bcrypt.hash(values.new_password, 10);
          const {phone, name, email} = values
          await db.user.update({
              where: { id: user.id },
              data: {
                  name,
                  email,
                  password: hashedPassword,
                  phone
              },
             
          });

    return { success: "Update successful" };
};

export const updateExp = async (user:any) => {
    await db.user.update({
        where: { id: user.id },
        data: {
            experience: user.experience,
        },
    });
    return { success: "Update successful" };
};

export const deleteUser = async (values: z.infer<typeof  deleteSchema>) => {
    const validatedFields = deleteSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }
    const { id } = validatedFields.data;
    await db.user.delete({
        where: { id: id },
     
    });
    return { success: "Delete successful" };
};
export const activeUser = async (value:boolean, id:string) => {
   
    await db.user.update({
        where: { id: id },
        data:{
            enable:value
        }
     
    });
    return { success: "Delete successful" };
};

export const create = async (values: z.infer<typeof CreateSchema>) => {
    const validatedFields = CreateSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }
    const { email, password, name, role } = validatedFields.data;
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
            role
        }
    });
    const verficationToken = await generateVerificationToken(email);
    await sendVerificationEmail(
        verficationToken.email,
        verficationToken.token,
    );
    return { success: "Confirmation email sent!" };
};

