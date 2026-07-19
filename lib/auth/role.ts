const ROLE_RANK: Record<string, number> = {
    VIEWER: 1,
    ANALYST: 2,
    ADMIN: 3,
    SUPER_ADMIN: 4,
}

export function hasMinimumRole(userRole: string, requiredRole: string): boolean {
    const userRank = ROLE_RANK[userRole] || 0;
    const requiredRank = ROLE_RANK[requiredRole] || 0;

    return userRank >= requiredRank;
}