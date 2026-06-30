import {Request , Response} from "express";
import {registerUser , loginUser} from "./auth.service";

const cookieOptions = {
   httpOnly: true,
   secure: false,
   maxAge: 3 * 24 * 60 * 60 * 1000
}

export const register = async (req : Request , res : Response) => {
    try {
        const {email , displayName , password} = req.body;

        const data = await registerUser({
            email,
            displayName,
            password
        });

        res.cookie("token" , data.token ,cookieOptions)

        return res.status(201).json({
            message : "User created successfully",
            user : data.user,
        }); 
    }
    catch(err){
        if(err instanceof Error){
            return res.status(400).json({
                message : err.message,
            });
        }

        return res.status(500).json({
            message : "Internal Server error"
        })
    }
};

export const login = async(req : Request , res : Response) => {
    try{
        const {email , password} = req.body;

        const data = await loginUser({
            email,
            password
        });

        res.cookie("token" , data.token , cookieOptions);

        return res.status(200).json({
            message : "login successful",
            user : data.user
        });
    }catch(error){
        if(error instanceof Error){
            return res.status(400).json({
                message : error.message,
            });
        }
        return res.status(500).json({
            message : "Internal Server error"
        })
    }
}