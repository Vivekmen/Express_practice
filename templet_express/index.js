const express=require("express");
const ejs=require("ejs");   
const controller=require("./controller")
const path=require("path")
const app=express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')))

app.get("/",(req,res)=>{
    
    res.send("static file is live on web....")
})

app.get("/dynamic",(req,res)=>{
    const userprofile={
        user_id: 1,
        user_name:"vivek",
        user_email:"menaparav2510@gmail.com",
        user_dob:"25-10-2002"
    }
    const username="vivek2510"
    res.render('index.ejs',{username,userprofile})
})

app.listen(8100,()=>{
  console.log("server is running on port 8100.......");
})