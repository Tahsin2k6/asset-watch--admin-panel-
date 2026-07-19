import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session"
import { hasMinimumRole } from "@/lib/auth/role";

export default async function ViewerPage() {
    const session = await getSession();

    if(!session) {
        redirect("/login");
    }

    const currentUser = session.user;

    if (!hasMinimumRole(currentUser.role, "VIEWER")) {
        redirect("/login");
    }
    
    return (
    <div className="p-6">
        <h1 className="text-2xl font-bold">Viewer Dashboard</h1>
        <p>Welcome Back, {currentUser.email}!</p>
    </div>
    )
}