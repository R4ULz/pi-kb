//require do express e handlebars
const express = require("express");
const app = express();
const session = require("express-session");
const path = require("path");
//const bcrypt = require('bcrypt')
const handlebars = require("express-handlebars").engine;

//require do mysql
const mysql = require("mysql");
const { resolveSOA } = require("dns");

//criando a sessão
app.use(session({ secret: "ssshhhhh" }));

//require do body-parser para pegar os dados do form
const bodyParser = require("body-parser");

//config engines
app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//definindo acesso a pasta publica
app.use(express.static("public"));

//config do bodyparser para leitura do post
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//conexao com mysql
function connectiondb() {
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "2021@Cadu@",
    database: "teste_login",
  });

  con.connect((err) => {
    if (err) {
      console.log("Erro ao conectar ao banco", err);
      return;
    }
    console.log("conexão estabelecida");
  });

  return con;
}

//rota inicial
app.get("/", (req, res) => {
  res.render("index");
});

//rota cadastro
app.get("/signin", (req, res) => {
  res.render("signin");
});


//metodo post do signin
app.post("/signin", async (req, res) => {
  let nome = req.body.name;
  let cpf = req.body.cpf;
  let email = req.body.email;
  let pass = req.body.password;

  var con = connectiondb();

  var queryConsulta = "SELECT * FROM users WHERE email LIKE ?";

  con.query(queryConsulta, [email], async function (err, results) {
    if (results.length > 0) {
      return res.render('signin', {
        message: 'esse email está em uso'
      })
      
    } else {
      var query = "INSERT INTO users VALUES (DEFAULT, ?, ?, ?, ?)";

      // let hashPassword = await bcrypt.hash(pass, 8);

      con.query(query, [nome, email, cpf, pass], function (err, results) {
        if (err) {
          throw err;
        } else {
          console.log("Usuario adicionado com email " + email);
          res.redirect("/login");
        }
      });
    }
  });
});

app.get("/perfil", (req, res) => {
  res.render("perfil");
});

//rota tela protect
app.get("/protect" , (req, res) =>{
  res.render("protect");
})

//rota login
app.get("/login", (req, res) => {
  res.render("login");
});

//método post do login
app.post("/login", async function (req, res) {
  // Pega os valores digitados pelo usuário
  var email = req.body.email;
  var pass = req.body.pass;
  // Conexão com banco de dados
  var con = connectiondb();
  // Query de execução
  var query = "SELECT * FROM users WHERE pass = ? AND email LIKE ?";

  // Execução da query
  con.query(query, [pass, email], function (err, results) {
    
    if(results.length < 0){
      return res.render('login', {
        message: 'Esse email não existe'
      })
    }

    if (results.length > 0) {
      req.session.user = email; // Seção de identificação
      console.log("Login feito com sucesso!");
      res.redirect("/perfil"); // Redirecionamento para /perfil
    } else {
      console.log(results[0]);
      res.render('login', {
        message: 'Login incorreto! Verifique suas credenciais e tente novamente'
      });
      //res.status(401).send("Login incorreto! Verifique suas credenciais e tente novamente.");
    }
  });
});


//executa servidor
app.listen("3000", () => {
  console.log("Server on");
});
