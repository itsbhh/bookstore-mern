const express=require("express");
const app= express();
require("dotenv").config();

//sending response
app.get("/",(req,res)=>{
    res.send("Hello");
})

//creating Port
app.listen(process.env.PORT, ()=>
{
    console.log("Server Working");
})