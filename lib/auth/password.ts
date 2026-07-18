import bcrypt from "bcryptjs";

export async  function hashPassword(password: string): Promise<string> {
    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    try{
        const isMatch = await bcrypt.compare(password, hashedPassword);
        return isMatch;
    }
    catch (error) {
        console.error(error);
        throw error;
    }
}