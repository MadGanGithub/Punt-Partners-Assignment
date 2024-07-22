import cors from "cors";
import express from "express";
import userRoutes from "./routes/routes.js";

const app=express();

app.use(cors({
   origin: 'http://localhost:3000', 
   credentials: true,
   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], 
   allowedHeaders: ['Content-Type', 'Authorization'], 
}));

app.use("/",userRoutes)

export default app;