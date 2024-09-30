"use server";
import { db } from "@/lib/db";
import * as  z from "zod";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/token";
import { sendVerificationEmail } from "@/lib/mail";
import { CategorySchema } from "@/schemas/category";

const deleteSchema = z.object({
    id: z.string().min(1, {
        message: "User id is required",
        })
  });

export const update = async (values: z.infer<typeof CategorySchema>) => {
    const validatedFields = CategorySchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }
    const { name, id } = validatedFields.data;
 
    await db.category.update({
        where: { id },
        data: {
            name,
             
        },
       
    });

    return { success: "Update successful" };
};

export const deleteCategory = async (values: z.infer<typeof  deleteSchema>) => {
    const validatedFields = deleteSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }
    const { id } = validatedFields.data;
    await db.category.delete({
        where: { id: id },
     
    });
    return { success: "Delete successful" };
};


export const create = async (values: z.infer<typeof CategorySchema>) => {
    const validatedFields = CategorySchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid fields!" };
    }
    const { name } = validatedFields.data;
   
    await db.category.create({
        data: {
            name 
        }
    });
    
    return { success: "Category create successful!" };
};

