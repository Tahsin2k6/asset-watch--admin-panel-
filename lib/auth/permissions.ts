export const SECTION_ACCESS = {
  MASTER_ROOT_CONTROL: ["SUPER_ADMIN"],
  USER_MANAGEMENT: ["SUPER_ADMIN", "ADMIN"],
  DATA_FORENSICS: ["SUPER_ADMIN", "ADMIN", "ANALYST"],
} as const;

export function hasSectionAccess(userRole: string, section: keyof typeof SECTION_ACCESS): boolean {
  const allowedRoles = SECTION_ACCESS[section];
  return (allowedRoles as readonly string[]).includes(userRole);
}