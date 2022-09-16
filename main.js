const { query } = require("express");
const express = require("express");
require("dotenv").config();
const app = express();
const port = process.env.PORT;
const axios = require("axios").default;
const { getTrending, getAZ, getManga } = require("./scrapper");

app.get("/", (req, res) => {
  res.send("hello world ! ");
});

app.get("/AZ", async (req, res) => {
  const manga = await getAZ();
  return res.json({ html: manga });
});

app.get("/trending", async (req, res) => {
  const manga = await getTrending();
  return res.json({ html: manga });
});

app.get("/mangas/:id", async (req, res) => {
  const manga= await getManga(req.params.id)
  return res.json({html: manga})
});

app.listen(port, () => {
  console.log("i am listening !!");
});