//importar a dependicas do sqlite3

const sqlite3 = require("sqlite3").verbose()

//Criar o objeto que ira fazer operacoes no banco de dados

const db = new sqlite3.Database("./src/database/database.db")


module.exports = db
//utilizar o objeto de banco de dados para operacoes

// db.serialize( () => {
//   //Com comandos SQL


//   //1 Criar uma tabelas

//   db.run(`
//       CREATE TABLE IF NOT EXISTS places (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         name TEXT,
//         image TEXT,
//         address TEXT,
//         address2 TEXT,
//         state TEXT,
//         city TEXT,
//         items TEXT
//       );
//   `)

//   //2 inserir dados na tabela
//   const query = `
//         INSERT INTO places (
//             name,
//             image,
//             address,
//             address2,
//             state,
//             city,
//             items
//         )VALUES (?,?,?,?,?,?,?);
//   `
// const values = [
//   "Papersider 5",
//   "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
//   "Guilherme Gemballa, Jardim América ",
//   "Número 260",
//   "Santa Catarina ",
//   "Rio do Sul",
//   "Papéis e Papelão"
// ] 
//  function afterInsertData (err) {
//   if (err) {
//         return console.log(err)
//       } 
//  console.log("Cadastro com Sucesso")
//  console.log(this)
// }

//   // db.run(query, values, afterInsertData)

//   //3 Consultar dados da tabela
//   // db.all(`SELECT * FROM places`, function(err, rows){
//   //   if (err) {
//   //     return console.log(err)
//   //   }
//   //   console.log("Aqui estão seus registros")
//   //   console.log(rows)
//   // })

//   //4 Deletar dados da tabela
//   db.run(`DELETE FROM places WHERE id = ?`, [4], function(err){
//     if (err) {
//       return console.log(err)
//     }
//     console.log("Registro deletado com Sucesso")
//     // console.log(rows)
//   })

// })