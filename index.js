const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { createServer } = require('http')
const app = express();
const port = process.env.PORT || 3000;

//routes
const User = require('./SRC/Routes/UserRoutes')
const Service = require('./SRC/Routes/ServiceRoutes')
const Horarios = require('./SRC/Routes/HorariosRoutes')
const Membros = require('./SRC/Routes/MembrosRoutes')
const Financeiro = require('./SRC/Routes/FinanceiroRoutes')
const Agendamentos = require('./SRC/Routes/AgendamentosRoutes')

//require
require('dotenv').config();
require('./SRC/BD/db')
require('./SRC/Models/User')
require('./SRC/Models/Service')
require('./SRC/Models/Horarios')
require('./SRC/Models/Membros')
require('./SRC/Models/Financeiro')
require('./SRC/Models/Agendamentos')

const httpServer = createServer(app);

app.use(cors())
app.use(bodyParser.json())
app.use(User)
app.use(Service)
app.use(Horarios)
app.use(Membros)
app.use(Financeiro)
app.use(Agendamentos)

httpServer.listen(port, () => {
    console.log('Server esta rodando na porta:' + port)
})

module.exports = app;