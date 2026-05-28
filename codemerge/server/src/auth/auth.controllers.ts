import {Request , Response} from "express";
import {registerUser} from "./auth.service";

export const register = async (req : Request , res : Response) => {
    try {
        const {email , username , password} = req.body;

        const user = await registerUser({
            email,
            username,
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