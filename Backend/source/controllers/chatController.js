import { chatClient } from "../lib/stream.js";

export async function getStreamToken(req,res) {
  try {
    //use clerk id for stream not mongodb _id = it should match the id we have in stream dashboard
    const token =chatClient.createToken(req.user.clerkId)
    res.staus(200).json({
      token,
      userId:req.user.clerkId,
      userName:req.user.name,
      userImage:req.user.image
    })
  } catch (error) {
    console.log("Error in getStreamToken controller:",error.message);
    res.staus(500).json({message:"Internal Server Error"});
  }
}