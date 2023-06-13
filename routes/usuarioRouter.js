const express = require('express')
const {crearUsuario, login} = require('../controllers/UsuarioController')


const usuario = express.Router()


usuario.post('/registrar', crearUsuario)
usuario.post('/login', login)


module.exports = usuario