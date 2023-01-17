
require('dotenv').config()
const express = require('express');
const { trending, manga, mangas, chapter } = require('./controllers/mangas.controller');
const { filterValidation } = require("./validators/validator");
const helmet = require("helmet")
const compression = require("compression")
const app = express();
const port = process.env.PORT || 3000;

app.use(helmet());
app.use(compression());


app.get("/", (req, res) => {
  res.json("hello world ! ");
});

app.get("/mangas/trending", trending);

app.get("/mangas/:id", manga);

app.get("/mangas", filterValidation, mangas)

app.get("/mangas/:id/chapters/:chapter", chapter)

app.listen(port, () => {
  console.log("i am listening !!");
});
