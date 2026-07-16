"use server";

import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { createSession } from "../session";
import { redirect } from "next/navigation";

export interface LogInResponse{
  error: string | null;
}

export async function handleLogIn(prevState: LogInResponse | null, formData: FormData): Promise<LogInResponse> {
  const email = (formData.get("email") as string).toLowerCase();

  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  let isSuccess = false;

  try{
    const user  = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });
    
    if (!user) {
      return { error: "Invalid email or password." };
    }
    
    const passValidate = await bcrypt.compare(password, user.passwordHash);
    
    if (!passValidate) {
      return { error: "Invalid email or password." };
    }

    await createSession(user.id);
    isSuccess = true;
    
  }
  catch (error) {
    console.error("Database connection/query login error:", error);
    return { error: "Internal database server error. Please try again." };
  }

  if (isSuccess) {
    redirect("/admin"); 
  }

  return { error: null };

}