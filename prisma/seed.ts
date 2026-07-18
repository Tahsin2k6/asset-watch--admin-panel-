import dotenv from "dotenv";
import { prisma } from "@/lib/db";
import { hashPassword } from "@/lib/auth/password";

dotenv.config();

const SEED_ADMIN_EMAIL = process.env.SEED_ADMIN_EMAIL; 
const SEED_ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD;

export async function seedAdminUser() {
    try{
        if (!SEED_ADMIN_EMAIL || !SEED_ADMIN_PASSWORD) {
            throw new Error("SEED_ADMIN_EMAIL or SEED_ADMIN_PASSWORD is missing from your .env file!");
        }

        const hashedPassword = await hashPassword(SEED_ADMIN_PASSWORD);

        await prisma.user.upsert({
            where: {
                email: SEED_ADMIN_EMAIL,
            },
            update: {
                passwordHash: hashedPassword,
            },
            create: {
                role: "SUPER_ADMIN",
                email: SEED_ADMIN_EMAIL,
                passwordHash: hashedPassword,
            }
        });
        console.log("Admin user seeded successfully!");
    }
    catch(error){
        console.error(error);
        throw error;
    }
}

async function main() {
    await seedAdminUser();
}

main().then(
    async () => {
        await prisma.$disconnect();
    }
)
.catch(
    async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    }
)