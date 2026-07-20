"use server";

import { prisma } from "@/lib/db";
import { createSession } from "../auth/session";
import { redirect } from "next/navigation";
import { verifyPassword } from "../auth/password";

export interface LogInResponse{
  error: string | null;
}

export async function handleLogIn(prevState: LogInResponse | null, formData: FormData): Promise<LogInResponse> {
  const email = (formData.get("email") as string).toLowerCase();
  const password = formData.get("password") as string;

  const rememberMeRaw = formData.get("rememberMe");
  const rememberMe = rememberMeRaw === "on";

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  let userRole: string | null = null;

  try{
    const user  = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });
    
    if (!user) {
      return { error: "Invalid email or password." };
    }
    
    const passValidate = await verifyPassword(password, user.passwordHash);
    
    if (!passValidate) {
      return { error: "Invalid email or password." };
    }

    await createSession(user.id, rememberMe);
    userRole = user.role;
    
  }
  catch (error) {
    console.error("Database connection/query login error:", error);
    return { error: "Internal database server error. Please try again." };
  }

  if (userRole) {
    redirect("/dashboard"); 
  }

  return { error: "An unexpected configuration error occurred." };

}