const express = require("express")
const server = express()

//Importar o banco de dados
const db = require("./database/db")


//configurar pasta public
server.use(express.static("public"))

// Habilitar o uso do req.body na nossa apolicacao

server.use(express.urlencoded({extended: true}))



//utilizando templates engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
  express: server,
  noCache: true,
})

//configurar caminhos para aplicacao
//req: Requisicao
//res: Resposta

//pagina inicial
server.get("/", (req, res) => {
  return res.render("index.html")
})

server.get("/create-point", (req, res) => {
  //req.query: Query Strings da nossa url
  console.log(req.query)

  return res.render("create-point.html" )
})

server.post("/save-point",(req, res) => {
  //req.body: o Corpo do nosso formulario
  //insirir dados no banco de dados

  const query = `
        INSERT INTO places (
            name,
            image,
            address,
            address2,
            state,
            city,
            items
        )VALUES (?,?,?,?,?,?,?);
  `
const values = [
  req.body.name,
  req.body.image,
  req.body.address,
  req.body.address2,
  req.body.state,
  req.body.city,
  req.body.items
] 
 function afterInsertData (err) {
  if (err) {
        console.log(err)
        return res.render("create-point.html", {erro: true})
        // return res.send("ERRO NO CADASTRO")
      } 
 console.log("Cadastro com Sucesso")
 console.log(this)

 return res.render("create-point.html", {saved: true})
}

   db.run(query, values, afterInsertData)

  
})


// Pesquisar
server.get("/search", (req, res) => {

  const search = req.query.search
  if( search == "") {
    //Pesquisa Vazia
    return res.render("search-results.html", {total:0})
  }



  //Pegar os dados do banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows){
      if (err) {
        return console.log(err)
      }
      // console.log("Aqui estão seus registros")
      //  console.log(rows)
      const total = rows.length

      //Mostrar a pagina html com os dados do banco de dados
      return res.render("search-results.html", {places: rows, total:total})
    })  
})

//Ligar o Servidor
server.listen(3000)
