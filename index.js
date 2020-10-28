/*
para a base do projeto utilizamos (geralmente base para todos):
npm instal init --save
npm instal express --save
npm instal body-parser --save
npm instal express-session --save
npm instal ejs --save
npm instal express-flash --save
*/
const bodyParser = require("body-parser");
var express = require("express");
const flash = require("express-flash");
var app = express();
var session = require("express-session");

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use(session({
    secret:'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie:{secure:true}
}))

app.use(flash())


//rotas
app.get("/",(req,res)=>{
    console.log("Está rodando...");
    res.send("Rodando...");
})


app.listen(5678,(req,res)=>{
    console.log("SERVER RODANDO");
});
//rodar server
//nodemon index.js