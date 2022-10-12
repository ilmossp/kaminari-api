
require('dotenv').config()
const express = require('express');
const { trending, manga, mangas} = require('./controllers/mangas.controller');
const {filterValidation} = require("./validators/validator");
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json("hello world ! ");
});

app.get("/mangas/trending", trending);

app.get("/mangas/:id", manga);

app.get("/mangas",filterValidation,mangas)


app.listen(port, () => {
  console.log("i am listening !!");
});
