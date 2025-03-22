const express=require("express");
const axios=require("axios");
require("dotenv").config();

const app=express();
const API_KEY="9b280c0c";

const getMovieData=async(movieName)=>{
    try {
        const response=await axios.get("http://www.omdbapi.com/?t=${movieName}&apikey=${API_KEY}");
        const data=response.data;
        if(data.Response==="False")
             return null;
        return{
            id:data.imdbID,
            title:data.Title,
            rating:data.imdbRating,
            image:data.Poster };}
    catch(error){
        console.error("Error fetching movie data:",error);
        return null;}
};

app.get("/movie/:movieName",async(req,res)=>{
    const movieName=req.params.movieName;
    const movieData=await getMovieData(movieName);
    if(!movieData){
        return res.status(404).json({error:"Movie not found"});}
    res.json(movieData);
});
app.get("/movie/:movieName/best",async(req,res)=>{
    const movieName=req.params.movieName;
    const movieData=await getMovieData(movieName+"best");
    if(!movieData){
        return res.status(404).json({error:"Best version not found"});}
    res.json(movieData);
});

app.listen(3000,()=>{
    console.log("Server is running on 3000");
});
