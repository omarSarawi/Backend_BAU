const express = require("express");
const app = express();
const fortunes = 
  ["Opportunities come to those who wait",
  "Everything happens for a reason",
  "Happiness lies in the little things"];
const jokes =
   ["Why don't computers use pencils? Because they're afraid of viruses",
  "Which animal never sleeps? The elephant, because it's always standing",
  "Why did the student go to school with a ladder? Because they heard the grades were high"];
const facts =
   ["Honey is the only food that never spoils",
  "A shrimp's heart is in its head",
  "An ant can lift objects 50 times its own weight"];

const getRandomItem = (array) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];};

app.get("/fortune", (req, res) => {
  const randomFortune = getRandomItem(fortunes);
  res.json({ fortune: randomFortune });});

app.get("/joke", (req, res) => {
  const randomJoke = getRandomItem(jokes);
  res.json({ joke: randomJoke });});

app.get("/fact", (req, res) => {
  const randomFact = getRandomItem(facts);
  res.json({ fact: randomFact });});

app.listen(3000, () => {
  console.log("Server is running on number 3000");});
