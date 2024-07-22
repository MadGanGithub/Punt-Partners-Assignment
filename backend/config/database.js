import mongoose from "mongoose";

const connectionDB=()=>{
    mongoose.connect("mongodb+srv://madhavganesan95:SI2PA8RQ5Zq6TydR@cluster0.rvug0qb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(db_meth=>(
        console.log(`MongoDB database connected with the host: ${db_meth.connection.host}`)
    ))
}

export default connectionDB;