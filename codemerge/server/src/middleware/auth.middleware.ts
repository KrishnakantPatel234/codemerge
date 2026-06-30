import {Request , Response , NextFunction} from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
   userId: string;
   email: string;
}

export const authMiddleware = (
    req : Request, 
    res : Response, 
    next : NextFunction
) =>{
    try{
        const token = req.cookies.token;
        const JWT_SECRET = process.env.JWT_SECRET;

        if(!token){
            return res.status(401).json({
                message : "Unauthorized"
            });
        }

        if(!JWT_SECRET){
            throw new Error("JWT Secret missing")
        }

        const decoded = jwt.verify(token , JWT_SECRET as string) as JwtPayload;

        req.user = decoded;

        return next();
    }catch(err){
        return res.status(401).json({
            message : "Invalid or expired token"
        })
    }
} 
