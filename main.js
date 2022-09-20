
require('dotenv').config()
const express = require('express');
const { trending, manga } = require('./controllers/mangas.controller');
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json("hello world ! ");
});

app.get("/mangas", async (req, res) => {
  const manga = await getAZ();
  return res.json({ html: manga });
});

app.get("/mangas/trending", trending);

app.get("/mangas/:id", manga);

app.listen(port, () => {
  console.log("i am listening !!");
});
