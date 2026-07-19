import { getSession } from "@/lib/auth/session"
import { redirect } from "next/navigation";

const ROLE_RANK: Record<string, number> = {
    VIEWER: 1,
    ANALYST: 2,
    ADMIN: 3,
    SUPER_ADMIN: 4,
}

export default async function ViewerPage() {
    const session = await getSession();

    if(!session) {
        redirect("/login");
    }

    const currentUser = session.user;

    const userRank = ROLE_RANK[currentUser.role] || 0;
    const minAdminRank = ROLE_RANK.VIEWER;

    if (userRank < minAdminRank) {
        redirect("/login");
    }
    
    return (
    <div className="p-6">
        <h1 className="text-2xl font-bold">Viewer Dashboard</h1>
        <p>Welcome Back, {currentUser.email}!</p>
    </div>
    )
}