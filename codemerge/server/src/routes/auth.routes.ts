import { Router } from "express";
import { register } from "../auth/auth.controllers";

const router = Router();

router.post("/register" , register);

export default router;