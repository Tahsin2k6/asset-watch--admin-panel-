import { getSession } from "./session";
import { hasMinimumRole } from "./role";
import { redirect } from "next/navigation";

export async function requireRole(minimumRequireRole: string) {
    const session = await getSession();

    if(!session) {
        redirect("/login");
    }

    const currentUser = session.user;

    if (!hasMinimumRole(currentUser.role, minimumRequireRole)) {
        redirect("/login");
    }

    return currentUser;
}