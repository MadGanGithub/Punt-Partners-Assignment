import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from 'url';
import userRoutes from "./routes/routes.js";

// Create __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app=express();
//This converts request body to json 
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

//body parser(To view in postman)
app.use(bodyParser.json())

app.use(cors({
   // origin: 'https://punt-frontend-puce.vercel.app',
   origin:'https://punt-frontend-puce.vercel.app',
   credentials: true,
   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
   allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use("/",userRoutes)

// Configure multer storage
const storage = multer.diskStorage({
   destination: (req, file, cb) => {
     cb(null, 'audios/');
   },
   filename: (req, file, cb) => {
     cb(null, `${Date.now()}-${file.originalname}`);
   }
 });
 
 const upload = multer({ storage: storage });
 
 app.post('/audio', upload.single('audio'), (req, res) => {
     try{
     res.json({ message:"File Uploaded",name:req.file.filename});
     }catch(error){
     console.log(error);
     }
 });
 
 //serve static files
 app.use('/audio', express.static(path.join(__dirname, 'audios')));

export default app;