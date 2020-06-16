const express = require('express')
const server = express()

//pegar o banco de dados:
const db = require('./database/db')

//configurar pasta pública (são arquivos estáticos, que não mudam):
server.use(express.static('public'))

//habilitar o uso do req.body:
server.use(express.urlencoded({extended:true}))

//utilizar template engine:
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache: true
})

//configurar caminhos da minha aplicação/site:
//página inicial:
server.get('/', (req, res) => { //req = requisição, res= resposta
    return res.render('index.html', { title: 'Seu marketplace de coleta de resíduos'})
})

//página create-point:
server.get('/create-point', (req, res) => { 
    //pegar infos do query strings, que é o que fica na url quando damos submit no formulário
    //console.log(req.query)

    return res.render('create-point.html')
    
})

server.post('/savepoint', (req, res) => {

    // req.body é o corpo do formulário
    // console.log(req.body)

    //inserir dados no banco de dados:
    const query = `
        INSERT INTO place (        
            image,
            name,
            address,
            address2,
            state,
            city,
            items
     ) VALUES (?,?,?,?,?,?,?);
  `
        const values = [
            req.body.image,
            req.body.name,
            req.body.address,
            req.body.address2,
            req.body.state,
            req.body.city,
            req.body.items
        ]
    
        function afterInsertData(err) {
            if(err) {
                return console.log(err)
            }
            console.log('Cadastrado com sucesso')
            console.log(this) // com o this não podemos usar a arrow function dentro de outra função, portanto devemos escrever function

            return res.render('create-point.html', {saved: true})
        }
    
        db.run(query, values, afterInsertData)
})

//página search-results:
server.get('/search', (req, res) => { 

    const search = req.query.search 

    if(search=='') {
        //pesquisa vazia:
        return res.render('search-results.html', {otal: 0})
    }

    //pegar os dados do banco de dados:
    db.all(`SELECT * FROM place WHERE city LIKE '%${search}%'`, function(err, rows) { 
        if(err) {
            return console.log(err)
        }

        const total = rows.length

        //mostrar a página html com os dados do banco de dados:
        return res.render('search-results.html', {place: rows, total: total})
    })

})


//ligar o servidor:
server.listen(3000)