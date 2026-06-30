import { prisma } from "../config/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

import {generateToken}  from "../utils/generateToken"

interface RegisterUserInput{
    email : string;
    displayName : string;
    password : string;
}

interface LoginUserInput{
    email : string;
    password : string;
}

const SALT_ROUNDS = 10;

export const registerUser = async ({ email, displayName ,password} : RegisterUserInput) => {
    // checking existing user

    const existingUser = await prisma.user.findUnique({
        where : {email}
    });

    if(existingUser){
        throw new Error("User already exists")
    }

    // Password hashing
    const hashedPassword = await bcrypt.hash(password ,SALT_ROUNDS);

    // Creating User
    const user = await prisma.user.create({
        data : {
            email,
            displayName,
            passwordHash : hashedPassword,
        },
    });

    const token = generateToken(user.id, user.email);

    return {
        token,
        user: {
            id: user.id,
            email: user.email,
            displayName: user.displayName
        }
    }
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
    const token = generateToken(user.id , user.email);
    
    return {
        token,
        user : {
            id : user.id,
            displayName : user.displayName,
            email : user.email
        },
    };
}
