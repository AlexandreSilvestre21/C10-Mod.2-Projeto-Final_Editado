const express = require("express");
const path = require("path");
const app = express();
require('dotenv').config()
const crud = require("./controller/crud")

const port = process.env.PORT || 3000;
const db = require('./model/database')
const jogos = require('./model/jogo');


app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }))

// rota para o crud
app.use("/", crud);

db.conectado();
app.listen(port, () =>console.log(`Servidor rodando em http://localhost:${port}`));