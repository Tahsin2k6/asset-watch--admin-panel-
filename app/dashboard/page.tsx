import { requireRole } from "@/lib/auth/requireRole"

export default async function DashboardPage() {
    
    const currentUser = await requireRole("VIEWER");
    const role = currentUser.role;
    
    return (
        <div className="p-6 max-w-4xl mx-auto space-y-6">
            <header className="border-b pb-4">
                <h1 className="text-3xl font-bold tracking-tight">AssetWatch Workspace</h1>
                <p className="text-gray-500 text-sm mt-1">
                  Logged in as: <span className="font-semibold">{currentUser.email}</span> ({role})
                </p>
            </header>

            <main className="space-y-4">
        
              <div className="p-4 bg-white border rounded-xl shadow-sm">
                <h2 className="text-black text-lg font-semibold mb-2">Global System Metrics</h2>
                <p className="text-sm text-gray-600">Active monitoring connections are operating normally.</p>
              </div>
            
              {role === "SUPER_ADMIN" && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                  <h2 className="text-lg font-semibold text-red-800">Master Root Control</h2>
                  <p className="text-sm text-red-700 mt-1">Danger zone utilities and environment configurations.</p>
                </div>
              )}
        
              {(role === "SUPER_ADMIN" || role === "ADMIN") && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                  <h2 className="text-lg font-semibold text-blue-800">User Management Console</h2>
                  <p className="text-sm text-blue-700 mt-1">Review system authorization tokens and provisioning lists.</p>
                </div>
              )}
        
              {role === "ANALYST" && (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                  <h2 className="text-lg font-semibold text-amber-800">Data Forensic Tools</h2>
                  <p className="text-sm text-amber-700 mt-1">Advanced telemetry queries and threat intelligence logs.</p>
                </div>
              )}
        
            </main>
        </div>
    )
}