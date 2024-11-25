const express = require('express')
const app = express()

const {infoCursos} = require('./cursos.js')

//routing

app.get('/', (req, res) => {
    res.send('Bienvenidos a nuestra API. Cursos disponibles.')
})

app.get('/api/cursos', (req, res) => {
    res.send(infoCursos)
})

const PUERTO = process.env.PORT || 3000

app.listen(PUERTO, () => {
    console.log(`Este servidor esta escuchando el puerto ${PUERTO}...`)
})
