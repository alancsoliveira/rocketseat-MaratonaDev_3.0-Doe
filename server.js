// 1 configurando o servidor

const express = require("express")
const server = express()


// 5 configurar o servidor para apresentar arquivos estáticos
server.use(express.static('public'))


// 7 Habilitar body do formulario
server.use(express.urlencoded({ extended: true }))


// 9 configurar a conexao com o banco de dados
const Pool = require('pg').Pool // poll é uma conexão que mantem a conexao sempre ativa após a primeira conexao.
const db = new Pool({
    user: 'postgres',
    password: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'doe'
})

// 4 configurando a template engine
const nunjucks = require('nunjucks')
nunjucks.configure("./", {
    express: server,
    noCache: true
})


const donorsLocal = [{
        name: "Cristian",
        blood: "AB+"
    },
    {
        name: "Rafael",
        blood: "A-"
    },
    {
        name: "Davi",
        blood: "AB-"
    },
    {
        name: "Jamerson",
        blood: "B+"
    }, {
        name: "Danilo",
        blood: "AB-"
    },
]

// 2 configura a apresentação da página
server.get("/", function(req, res) {

    db.query(`SELECT * FROM donors`, function(err, result) {
        if (err) {
            const donors = donorsLocal

            return res.render('index.html', { donors })
        }

        const donors = result.rows
        return res.render('index.html', { donors })

    })

})

// 6 pegar dados do formulário
server.post("/", function(req, res) {
    const { name } = req.body
    const { email } = req.body
    const { blood } = req.body


    if (name == "" || email == "" || blood == "") {
        return res.send("Preencha todos os campos!")
    }

    // 8 coloca valores no banco de dados
    const query = `
    INSERT INTO donors ("name", "email", "blood") 
    VALUES ($1, $2, $3)`

    const values = [name, email, blood]

    db.query(query, values, function(err) {
        // fluxo sem banco de dados
        if (err) {
            donorsLocal.push({
                name,
                blood
            })
        }
        // retorna uma resposta de redirecionamento para a página inicial
        // fluxo ideal
        return res.redirect("/")

    })

})


// 3 ligar o servidor e habilitar o acesso na porta 3000
server.listen(3000) // Essa funcionalidade cria um servidor que irá 'ouvir' uma determinada porta