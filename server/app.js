const express=require("express")
const connectDB = require("./config/database")
const cookieParser = require("cookie-parser")
const AuthRoute=require("./routes/auth.route")
const AdminRoute=require("./routes/admin.route")

const app=express()

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))

const corsOption={
    origin:"http://localhost:5173",
    credentials:true
}
app.use(corsOption)

app.use("auth",AuthRoute)
app.use("admin",AdminRoute)

app.listen(3000,()=>{
    connectDB()
    console.log("Server is running")
    
})