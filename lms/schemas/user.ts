import * as z from "zod";
 
export const UserSchema = z.object({
    email: z.string().email({
        message: "Email is required",
        }) ,
    password: z.string().min(6, {
        message: "Minimum 6 characters required",
        }) , 
    name: z.string().min(1, {
        message: "Name is required",
        }) ,
    userId: z.string().min(1, {
        message: "User id is required",
        }) ,
});
export const CreateSchema = z.object({
    email: z.string().email({
        message: "Email is required",
        }) ,
    password: z.string().min(6, {
        message: "Minimum 6 characters required",
        }) , 
    name: z.string().min(1, {
        message: "Name is required",
        }) ,
 
        role: z.enum(["ADMIN", "STUDENT", "TEACHER"], {
            message: "User role is required",
          })
});