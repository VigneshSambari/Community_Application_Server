const express=require("express");

const app=express();

const Port=process.env.PORT||2000;

app.listen(Port,"0.0.0.0",()=>console.log("Running"));