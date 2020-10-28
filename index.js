/*
para a base do projeto utilizamos (geralmente base para todos):
npm instal init --save
npm instal express --save
npm instal body-parser --save
npm instal express-session --save
npm instal ejs --save
npm instal express-flash --save
npm install cookie-parser --save
*/
const bodyParser = require("body-parser");
var express = require("express");
const flash = require("express-flash");
var app = express();
var session = require("express-session");
var cookieParser = require("cookie-parser");

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use(cookieParser("jsaddsh"));
app.use(session({
    secret:'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie:{maxAge: 60000}
}))

app.use(flash())


//rotas
app.get("/",(req,res)=>{
    var emailError =req.flash("emailError");
    var pontosError=req.flash("pontosError");
    var nomeError=req.flash("nomeError");
    var email = req.flash("email");

    emailError = (emailError == undefined || emailError.length == 0) ? undefined : emailError;
    email = (email == undefined || email.length ==0)?"":email;
    res.render("index",{emailError,pontosError,nomeError, email: email});
})

app.post("/form",(req,res)=>{
    var {email, nome, pontos} = req.body;

    var emailError;
    var pontosError;
    var nomeError;


    if(email == undefined || email == ""){
        emailError = "O email não pode ser vazio";
    }

    if(pontos == undefined || pontos<20){
      pontosError ="Nao pode ter menos de 20 pontos";
    }

    if(nome == undefined ||nome == ""){
        nomeError ="O nome não pode ser vazio";
    }
    if(nome.length>4){
        nomeError ="O nome é muito pequeno";
    }

    if(emailError != undefined||pontosError!=undefined||nomeError!=undefined){
        req.flash("emailError",emailError);
        req.flash("pontosError",pontosError);
        req.flash("nomeError",nomeError);
        req.flash("email",email);

        res.redirect("/");
    }else{
        res.send("Show de bola");
    }
 
})

app.listen(5678,(req,res)=>{
    console.log("SERVER RODANDO");
});
//rodar server
//nodemon index.js