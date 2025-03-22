const express=require("express");
const {PrismaClient}=require("@prisma/client");

const prisma=new PrismaClient();
const app=express();
app.use(express.json());

app.post("/games",async(req,res)=>{
  const{title,genre,year,condition}=req.body;
  const game=await prisma.game.create({
    data:{title,genre,year,condition},});
  res.json(game);
});

app.get("/games",async(req,res)=>{
  const {title}=req.query;
  const games=title
    ? await prisma.game.findMany({where:{title:{contains:title}}})
    : await prisma.game.findMany();
  res.json(games);
});

app.put("/games/:id",async(req,res)=>{
  const {id}=req.params;
  const {title,genre,year,condition}=req.body;
  const updatedGame=await prisma.game.update({
    where: {id:parseInt(id)},
    data: {title,genre,year,condition}});
  res.json(updatedGame);
});

app.delete("/games/:id",async(req,res)=>{
  const {id}=req.params;
  await prisma.game.delete({where:{id:parseInt(id)}});
  res.json({message:"deleted successfully"});
});

app.listen(3000,()=>{
    console.log("Server running on 3000")});


