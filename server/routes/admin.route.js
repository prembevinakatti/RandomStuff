const express=require("express")
const {register}=require("../controllers/admin.controller")
const router=express.Router()
router.route("/register").post(register)
module.exports=router