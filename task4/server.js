const express =require("express");
const app =express();
app.use(express.json());

let missions = [];
let nextId = 1;
app.post("/missions",(req,res) =>{
    const {name,status} =req.body;
    if (!name||!status) {
    return res.status(400).json({error:"Mission name and status are required" });}
    
    const newMission ={id:nextId++,name,status};
    missions.push(newMission);
    res.status(201).json(newMission);});

app.get("/missions",(req,res) =>{
    res.json(missions);});

app.get("/missions/:id",(req, res) =>{
    const mission=missions.find(m=>m.id===parseInt(req.params.id));
    if(!mission){
    return res.status(404).json({error:"Mission not found"});}
    res.json(mission);});

app.put("/missions/:id", (req, res) =>{
    const mission =missions.find(m => m.id === parseInt(req.params.id));
    if (!mission){
    return res.status(404).json({error:"Mission not found"});}
    
    const {status} =req.body;
    if (!status){
    return res.status(400).json({error:"Mission status is required"});}
    mission.status =status;
    res.json(mission);});

app.delete("/missions/:id",(req,res) =>{
    const missionIndex =missions.findIndex(m =>m.id === parseInt(req.params.id));
    if (missionIndex===-1) {
    return res.status(404).json({error:"Mission not found"});}
    missions.splice(missionIndex,1);
    res.status(204).send();});

    app.listen(3000,() =>{
        console.log("Server is running on number 3000");});
      
