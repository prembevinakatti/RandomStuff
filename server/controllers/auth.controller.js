
const authModel = require("../models/auth.model");


module.exports.register=async(req,res)=>{
    try {
        const{username,email,password}=req.body;
        if(!username||!email||!password){
            res.status(404).json({message:"All fields are required"})
        }

        const hash=await bcrypt.hash(password,10)

        const user=authModel.findOne({email})
        if(user){
            res.status(204).json({message:"User already existed in database"})
        }
        const newuser=await authModel.create({
            username,
            password,
            email
        })

        const token=jwt.sign({email},"dfghjioiuytdfghyuio")
        res.cookie("Token",token)
        res.status(200).json({message:"user created successfully",success:true,user:newUser}) 
 
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
        const user=await authModel.findOne({email})
        if(!user){
            return res.status(204).json({message:"user not found"})
        }
        
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            res.status(200).json({message:"password does not match"})
        }

        const token=jwt.sign({email},"dfghjioiuytdfghyuio")
        res.cookie("Token",token)
        res.status(200).json({message:"user login successfull",success:true,user:user}) 


     } catch (error) {
        console.log("error",error.message)
     }
}
