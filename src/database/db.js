//importar a dependência do sqlite3
const sqlite3 = require('sqlite3').verbose()  //verbose faz com que eu veja mensagens no terminal sobre o sqlite

//criar o objeto que irá fazer operações no banco de dados:
const db = new sqlite3.Database('./src/database/database.db') // essa é uma outra maneira de criar um objeto, em vez de usar {} com propriedades dentro

module.exports = db  //linha de código usada para puxar o banco de dados lá no server.js usando o require

//utilizar o objeto de banco de dados para nossas operações:
// db.serialize(() => { // os passos são comandos em SQL
//     //criar uma tabela:
//     db.run(`
//         CREATE TABLE IF NOT EXISTS place (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             image TEXT,
//             name TEXT,
//             address TEXT,
//             address2 TEXT,
//             state TEXT,
//             city TEXT,
//             items TEXT
//         );
//     `) // com crase da quebrar linha, é chamado de template literals ou template strings

//     //inserir dados na tabela:
//     const query = `
//     INSERT INTO place (
//         image,
//         name,
//         address,
//         address2,
//         state,
//         city,
//         items
//     ) VALUES (?,?,?,?,?,?,?);
// `
//     const values = [
//         'https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
//         'Paperside',
//         'Guilherme Geballa, Jardim América',
//         'Nº 260',
//         'Santa Catarina',
//         'Rio do Sul',
//         'Papéis e Papelão',
//     ]

//     function afterInsertData(err) {
//         if(err) {
//             return console.log(err)
//         }
//         console.log('Cadastrado com sucesso')
//         console.log(this) // com o this não podemos usar a arrow function dentro de outra função, portanto devemos escrever function
//     }

//     db.run(query, values, afterInsertData) // se eu colocar afterInsertData() com os parentes ela é chamada na hora, sem o parenteses
    // ela fica apoenas como referência e pode ser chamada neste caso como deve ser, apenas depois (callback)

    //consultar os dados da tabela:
    // db.all(`SELECT * FROM place`, function(err, rows) { 
    //     //* significa tudo, ou seja, vai selecionar tudo da tabela place
    //     if(err) {
    //         return console.log(err)
    //     }

    //     console.log('Aqui estão seus registros:')
    //     console.log(rows)
    // })

    //deletar um dado da tabela:
    // db.run(`DELETE FROM place WHERE id = ?`, [3], function(err) {
    //     if(err) {
    //         return console.log(err)
    //     }

    //     console.log('Registro deletado com sucesso!')
    // })
// })
