import cors from "cors";
import express from "express";
import userRoutes from "./routes/routes.js";

const app=express();

app.use(cors({
   origin: 'https://punt-frontend-puce.vercel.app/', 
   credentials: true,
   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
   allowedHeaders: ['Content-Type', 'Authorization'], 
}));

app.use("/",userRoutes)

export default app;