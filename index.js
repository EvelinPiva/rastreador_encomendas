const express = require('express')
const app = express()
const cors = require('cors')

const PORT = 3000
const hostname = 'localhost'

const conn = require('./db/conn')

// Carrega os relacionamentos das models
require('./models/rel')

const authMiddleware = require('./middleware/auth.middleware')
const authController = require('./controller/auth.controller')
const cargaController = require('./controller/carga.controller')
const entregaController = require('./controller/entrega.controller')
const funcionarioController = require('./controller/funcionario.controller')
const motoristaController = require('./controller/motorista.controller')

// ----- middlewares -----
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

// Rotas públicas
app.post('/motorista', motoristaController.cadastrar)
app.post('/login', authController.login)

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Aplicação de motorista Rodando!' })
})

// Middleware de Autenticação para proteger as rotas abaixo
app.use(authMiddleware)

// Rotas privadas do motorista (CRUD Completo)
app.get('/motoristas', motoristaController.listar)
app.get('/motorista/buscarNome/:nome', motoristaController.consultar)
app.get('/motorista/:id',motoristaController.consultar)
app.put('/motorista/:id', motoristaController.atualizar)
app.delete('/motorista/:id', motoristaController.apagar)

// Rotas privadas de carga e entrega
app.post('/carga', cargaController.cadastrar)
app.post('/entrega', entregaController.cadastrar)
app.put('/entrega/:id', entregaController.atualizar)
app.get('/entregas', entregaController.listar)

app.post('/funcionario',funcionarioController.cadastrar)

// Sincroniza banco e inicia o servidor
conn.sync()
    .then(() => {
        app.listen(PORT, hostname, () => {
            console.log(`Servidor rodando em http://${hostname}:${PORT}`)
        })
    })
    .catch((err) => {
        console.error('Erro ao conectar com o banco de dados!', err)
    })