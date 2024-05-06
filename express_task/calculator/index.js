const controller=require("./controller")
const express=require("express");
const app=express();

app.get("/",controller.calcaulator);
app.listen(8200,()=>{
    console.log(`server is running on port 8200.....`);
})