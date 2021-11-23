const express = require('express')
const QuestionController = require('./controllers/QuestionController')
const RoomController = require('./controllers/RoomController')

const route = express.Router()

//room
/* a resposta da rota será renderizar o arquivo index */
route.get('/', (req, res) => res.render('index', { page: 'enter-room' }))

route.get('/room/:room', RoomController.open)

route.post('/create-room', RoomController.create)

route.post('/enterroom', RoomController.enter)

//password
route.get('/create-pass', (req, res) =>
  res.render('index', { page: 'create-pass' })
)

//questions
//formato que o formulário de dentro da modal tem que passar a informação
// o ":" representa uma variável
route.post('/question/:room/:question/:action', QuestionController.index)

route.post('/question/create/:room', QuestionController.create)

module.exports = route
