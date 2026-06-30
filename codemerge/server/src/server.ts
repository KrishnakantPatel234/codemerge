import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// Importing routes
import authRoutes  from "./routes/auth.routes"; 

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin : process.env.CLIENT_URL,
    credentials : true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]
}));

app.use(express.json());
app.use(cookieParser());

app.use("/auth" , authRoutes);

app.get("/" , (req , res) => {
    res.send("Server is running");
})


app.listen(PORT , () => {
    console.log(`Server is running on port ${PORT}`);
})