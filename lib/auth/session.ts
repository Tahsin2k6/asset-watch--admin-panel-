import crypto from "crypto";
import { prisma } from "../db";
import { cookies } from "next/headers";

const SESSION_DURATION = 60 * 60 * 1000;

function hashToken(token: string): string {
    return crypto.createHash("sha256").update(token).digest("hex");
}

export async function createSession(userID: string) {
    const expiresAt = new Date(Date.now() + SESSION_DURATION);

    const rawToken = crypto.randomUUID();

    const hashedToken = hashToken(rawToken);

    await prisma.session.create({
        data: {
            id: hashedToken,
            userId: userID,
            expiresAt: expiresAt,
        }
    })

    const cookieStore = await cookies();
    cookieStore.set("session", rawToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        expires: expiresAt,
        sameSite: "lax",
        path: '/'
    })
}

export async function getSession() {
    const cookieStore = await cookies();
    const rawToken = cookieStore.get("session")?.value;

    if(!rawToken) return null;

    const hashedToken = hashToken(rawToken);

    const session = await prisma.session.findUnique({
        where: { id: hashedToken },
        include: { 
            user: {
                select: {
                    id: true,
                    email: true,
                    role: true,
                    createdAt: true
                }
            }
         }
    })

    if(!session) return null;

    const isExpired = new Date() > session.expiresAt;

    if(isExpired) {
        await prisma.session.delete({
            where: { id: hashedToken }
        });
        cookieStore.delete("session");
        return null;
    }

    return session;
}

export async function deleteSession(): Promise<void> {
    const cookieStore = await cookies();
    const rawToken = cookieStore.get("session")?.value;

    if(rawToken) {
        const hashedToken = hashToken(rawToken);
        try{
            await prisma.session.delete({
                where: { id: hashedToken }
            });
        }
        catch(error) {
            console.error("Session already removed or missing from DB:", error);
        }
    }

    cookieStore.delete("session");
}