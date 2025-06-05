const adminModel = require("../models/admin.model");


module.exports.register=async(req,res)=>{
    try {
        const{username,email,password}=req.body;
        if(!username||!email||!password){
            res.status(404).json({message:"All fields are required"})
        }
        const user=adminModel.findOne({email})
        if(user){
            res.status(204).json({message:"User already existed in database"})
        }
        const newuser=await adminModel.create({
            username,
            password,
            email
        })
        res.status(200).json({message:"user created successfully",user:newuser})
    } catch (error) {
      console.log("error",error.message)  
    }
}

module.exports.login=async(req,res)=>{
     try {
        const{email,password}=req.body;
        if(!email||!password){
            return res.status(404).json({message:"All fields are required"})
        }
        const user=await adminModel.findOne({email})
        if(!user){
            return res.status(204).json({message:"user not found"})
        }

     } catch (error) {
        console.log("error",error.message)
     }
}