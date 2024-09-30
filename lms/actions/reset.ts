"use server";
import * as z from "zod";
import { getUserByEmail } from "@/data/user";
import { ResetSchema } from "@/schemas/reset";
import { generatePasswordResetToken } from "@/lib/token";
import { sendPasswordResetEmail } from "@/lib/mail";
export const reset = async (values: z.infer<typeof ResetSchema>) => {
    const validatedFields = ResetSchema.safeParse(values);
    if (!validatedFields.success) {
        return { error: "Invalid email!" }
    }
    const { email } = validatedFields.data;
    const existingUser = await getUserByEmail(email);
    if (!existingUser) {
        return { error: "Email not found!" };
    }
    const passwordResetToken = await generatePasswordResetToken(email);
    console.log("🚀 ~ reset ~ passwordResetToken:", passwordResetToken)
    if(passwordResetToken){
        await sendPasswordResetEmail(
            passwordResetToken.email,
            passwordResetToken.token,
        )
    }
    return { success: "Reset email sent!" }
}