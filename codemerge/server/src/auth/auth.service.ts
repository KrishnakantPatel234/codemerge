import { prisma } from "../config/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

interface RegisterUserInput{
    email : string;
    displayName : string;
    password : string;
}

interface LoginUserInput{
    email : string;
    password : string;
}

export const registerUser = async ({ email, displayName ,password} : RegisterUserInput) => {
    // checking existing user

    const existingUser = await prisma.user.findFirst({
        where : {email}
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
            displayName,
            passwordHash : hashedPassword,
        },
    });

    return user;
}

export const loginUser = async ({email , password} : LoginUserInput) => {
    
    // checking user exists
    const user = await prisma.user.findUnique({
        where : {
            email,
        },
    });

    if(!user || !user.passwordHash){
        throw new Error("Invalid credentials");
    }

    // comparer passwords
    const isPasswordCorrect = await bcrypt.compare(
        password,
        user.passwordHash
    );

    if(!isPasswordCorrect){
        throw new Error("Invalid credentials");
    }

    // generate JWT token
    const token = jwt.sign(
        {
            userId : user.id,
            email : user.email
        },
        process.env.JWT_SECRET as string,
        {
            expiresIn : "3d"
        }
    )
    
    return {
        token,
        user : {
            id : user.id,
            displayName : user.displayName,
            email : user.email
        },
    };
}
