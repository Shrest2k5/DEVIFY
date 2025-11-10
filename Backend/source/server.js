import express from "express";
import path from "path"
import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";


const app = express();

const __dirname = path.resolve()

app.get("/health",(req,res)=>{
  res.status(200).json({msg:"api is up and running"})
})

app.get("/books",(req,res)=>{
  res.status(200).json({msg:"this is the books endpoint"})
})

//make our app ready for development
if(ENV.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname,"../Frontend/dist")));

  app.get("/{*any}",(req,res)=>{
  res.sendFile(path.join(__dirname,"../Frontend","dist","index.html"));
});
}






const startServer = async()=>{
  try {
    await connectDB();
    app.listen(ENV.PORT, () =>console.log("Server is running on port:",ENV.PORT));
  } catch (error) {
    console.error("Error starting the server",error)
  }
}

startServer();