import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Importing routes
import authRoutes  from "./routes/auth.routes"; 

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/auth" , authRoutes);

app.get("/" , (req , res) => {
    res.send("Server is running");
})


app.listen(PORT , () => {
    console.log(`Server is running on port ${PORT}`);
})