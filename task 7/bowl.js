require("dotenv").config();
const express=require("express");
const {PrismaClient}=require("@prisma/client");
const {body,param,validationResult}=require("express-validator");
const app=express();
const prisma=new PrismaClient();
app.use(express.json());

app.post(
  "/scores",
  [body("name").isString().notEmpty(), body("score").isInt({ min:0,max:300})],
  async (req,res)=>{
    const errors=validationResult(req);
    if (!errors.isEmpty()){
      return res.status(400).json({errors: errors.array()});}
    try{
      const {name,score}=req.body;
      const newScore=await prisma.score.create({data:{name,score}});
      res.status(201).json(newScore);} 
      catch (error){
      res.status(500).json({error:"Something went wrong"});}
  });

app.get("/scores",async(req,res)=>{
  try{
    const {page=1,limit=10}=req.query;
    const scores=await prisma.score.findMany({
      orderBy:{score:"desc"},
      skip:(page-1)*limit,
      take:parseInt(limit),});
    res.json(scores);}
     catch(error){
    res.status(500).json({error:"Something went wrong"});}
});

app.put(
  "/scores/:id",
  [param("id").isInt(), body("score").isInt({min:0,max:300})],
  async(req,res)=>{
    const errors=validationResult(req);
    if (!errors.isEmpty()){
      return res.status(400).json({errors: errors.array()});}
    try{
      const {id}=req.params;
      const {score}=req.body;
      const updatedScore=await prisma.score.update({
        where: {id:parseInt(id)},
        data: {score},});
      res.json(updatedScore);} 
      catch(error){
      res.status(500).json({error:"Something went wrong"});}
  });

app.delete("/scores/:id",[param("id").isInt()],async(req, res)=>{
  const errors=validationResult(req);
  if (!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()});}
  try {
    const {id}=req.params;
    await prisma.score.delete({where:{id:parseInt(id)}});
    res.json({message:"Score deleted successfully"});} 
    catch(error){
    res.status(500).json({ error: "Something went wrong" });}
});

app.listen(3000,() =>{
  console.log("Server is running on port ${PORT}");
});
