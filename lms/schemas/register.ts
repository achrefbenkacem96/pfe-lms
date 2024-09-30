import * as z from "zod";

export const RegisterSchema = z.object({
    email: z.string().email({
        message: "Email is required",
        }) ,
    password: z.string().min(6, {
        message: "Minimum 6 characters required",
        }) , 
    name: z.string().min(1, {
        message: "Name is required",
        }) ,
        role: z.string().min(1, {
        message: "Role is required",
        }) ,
        phone: z.string().min(7, "Phone number must be at least 10 digits").optional(),
        image: z.string().url("Invalid image URL").optional(),
});