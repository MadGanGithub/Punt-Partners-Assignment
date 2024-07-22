import dotenv from "dotenv";
import app from "./app.js";
// import connectionDB from "./config/database.js";

dotenv.config({ path: "./config/config.env" });

// connectionDB();

app.listen(process.env.PORT, ()=>{ 
    console.log(`Started at port: ${process.env.PORT}`);
});