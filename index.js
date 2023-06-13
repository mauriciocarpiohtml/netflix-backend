const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const conectarDB = require('./db/data')
 const usuario = require('./routes/usuarioRouter')

const app = express()

dotenv.config()
app.use(express.json())

app.use(cors())

conectarDB()

// RUTAS

app.get('/', (req, res) => {
  res.send('Hello from index')
})

 app.use('/api/usuarios', usuario )

const port = process.env.port

app.listen(port, () => {
    console.log(`Escuchando en el puerto ${port}`)
  })