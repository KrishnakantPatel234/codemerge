import {Request , Response} from "express";
import {registerUser , loginUser} from "./auth.service";

export const register = async (req : Request , res : Response) => {
    try {
        const {email , displayName , password} = req.body;

        const user = await registerUser({
            email,
            displayName,
            password
        });

        res.status(201).json({
            message : "User created successfully",
            user,
        }); 
    }
    catch(err){
        if(err instanceof Error){
            res.status(400).json({
                message : err.message,
            });
        }
    }
};

export const login = async(req : Request , res : Response) => {
    try{
        const {email , password} = req.body;

        const data = await loginUser({
            email,
            password
        });

        res.status(200).json({
            message : "login successful",
            ...data,
        })
    }catch(error){
        if(error instanceof Error){
            res.status(400).json({
                message : error.message,
            });
        }
    }
}