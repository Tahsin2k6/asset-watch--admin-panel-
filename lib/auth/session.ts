import { cookies } from "next/headers";
import { prisma } from "../db";

const SESSION_DURATION = 60 * 60 * 1000;

export async function createSession(userID: string) {
    const expiresAt = new Date(Date.now() + SESSION_DURATION);

    const token = crypto.randomUUID();

    await prisma.session.create({
        data: {
            id: token,
            userId: userID,
            expiresAt: expiresAt,
        }
    })

    const cookieStore = await cookies();
    cookieStore.set("session", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        expires: expiresAt,
        sameSite: "lax",
        path: '/'
    })
}

export async function getSession() {
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value;

    if(!token) return null;

    const session = await prisma.session.findUnique({
        where: { id: token },
        include: { user: true }
    })

    if(!session) return null;

    const isExpired = new Date() > session.expiresAt;

    if(isExpired) {
        await prisma.session.delete({
            where: { id: token }
        });
        cookieStore.delete("session");
        return null;
    }

    return session;
}

export async function deleteSession(): Promise<void> {
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value;

    if(token) {
        try{
            await prisma.session.delete({
                where: { id: token }
            });
        }
        catch(error) {
            console.error("Session already removed or missing from DB:", error);
        }
    }

    cookieStore.delete("session");
}