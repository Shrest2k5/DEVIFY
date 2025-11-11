import express from "express";
import path from "path";
import cors from "cors";
import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import {serve} from "inngest/express"
import {clerkMiddleware} from '@clerk/express'
import { inngest,functions } from "./lib/inngest.js";
import chatRoutes from "./routes/chatRoutes.js"

const app = express();

const __dirname = path.resolve()


//middleware
app.use(express.json())
app.use(cors({origin:ENV.CLIENT_URL,credentials:true}));
app.use(clerkMiddleware());

app.use("/api/inngest",serve({client:inngest,functions}));
app.use("/api/chat", chatRoutes)

app.get("/health",(req,res)=>{
  res.status(200).json({msg:"api is up and running"})
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