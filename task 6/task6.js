const express= require("express");
const app=express();
const mysql=require("mysql2");
const pool = mysql.createPool({
    host:"localhost",
    port:"3306",
    user:"root",
    database:"intro-to-backend"
}).promise();

app.get("/users",async(req,res)=>{
    const data =await pool.execute("select * from users");
    console.log(data[0]);
    res.send(data[0]);
})
app.listen(3000,()=>{
    console.log("listen on port nimber 3000");
    
})