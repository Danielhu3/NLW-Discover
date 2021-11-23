const express = require('express')

const route = require('./route')

const path = require('path')

const server = express()

server.set('view engine', 'ejs')

/* procura na raiz do projeto */
server.use(express.static('public'))

/* o path junta o dirname(src/ com views => src/views) */
server.set('views', path.join(__dirname, 'views'))

//para pegar o password no body do modal
server.use(express.urlencoded({ extended: true }))

server.use(route)

server.listen(3000, () => console.log('Server start'))
