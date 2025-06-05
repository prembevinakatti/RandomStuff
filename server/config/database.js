const mongoose=require("mongoose")
const connectDB=async(req,res)=>{
    try {
       await mongoose.connect("mongodb://localhost:27017/").then(()=>{
        consolr.log("Connection Successful")
       }).catch((error)=>{
        console.log("error",error.message)
       })
    } catch (error) {
      console.log("error",error.message)  
    }
}
module.exports=connectDB