import { getSession } from "@/lib/auth/session"
import { redirect } from "next/navigation";

export default async function AdminPage() {
    const session = await getSession();

    if(!session) {
        redirect("/login");
    }

    const currentUser = session.user;
    
    return (
    <div className="p-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p>Welcome Back, {currentUser.email}!</p>
    </div>
    )
}