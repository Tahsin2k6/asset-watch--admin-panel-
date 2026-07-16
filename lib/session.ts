import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

export async  function hashPassword(password:string): Promise<string> {
    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export async function createSession(userID: string) {
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

    const cookieStore = await cookies();
    cookieStore.set("session", userID, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        expires: expiresAt,
        sameSite: "lax",
        path: '/'
    })
}

export async function deleteSession() {
    const cookieStore = await cookies();
    cookieStore.delete("session");
}