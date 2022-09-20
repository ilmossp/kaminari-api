
require('dotenv').config()
const express = require('express')
const app = express();
const port = process.env.PORT;
const { getTrending, getAZ, getManga } = require("./scrapper")

app.get("/", (req, res) => {
  res.json("hello world ! ");
});

app.get("/AZ", async (req, res) => {
  const manga = await getAZ();
  return res.json({ html: manga });
});

app.get("/trending", async (req, res) => {
  const manga = await getTrending();
  return res.json(manga);
});

app.get("/mangas/:id", async (req, res) => {
  const manga= await getManga(req.params.id)
  return res.json({html: manga})
});

app.listen(port, () => {
  console.log("i am listening !!");
});
