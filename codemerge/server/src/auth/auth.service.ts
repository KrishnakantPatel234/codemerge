import { prisma } from "../config/prisma";
import bcrypt from "bcrypt";

interface RegisterUserInput{
    email : string;
    username : string;
    password : string;
}

export const registerUser = async ({ email, username,password} : RegisterUserInput) => {
    // checking existing user

    const existingUser = await prisma.user.findFirst({
        where : {
            OR : [
                {email},
                {username}
            ]
        }
    });

    if(existingUser){
        throw new Error("User already exists")
    }

    // Password hashing
    const hashedPassword = await bcrypt.hash(password ,10);

    // Creating User
    const user = await prisma.user.create({
        data : {
            email,
            username,
            passwordHash : hashedPassword,
        },
    });

    return user;
}


