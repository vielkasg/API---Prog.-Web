const express = require('express')
const app = express()

const {infoCursos} = require('./datos/cursos.js')

//MiddelWare este apartado funciona para hacer las peticiones de tipo post, cambiar data para el Backend
app.use(express.json())

//routers
const routerProgramacion = require('./routers/programacion.js');
app.use('/api/cursos/programacion', routerProgramacion);

const routerMatematicas = require('./routers/matematicas.js')
app.use('/api/cursos/matematicas', routerMatematicas);

//routing - rutas

app.get('/', (req, res) => {
    res.send('Bienvenidos a nuestra API. Cursos disponibles.')
})

app.get('/api/cursos', (req, res) => {
    res.send(infoCursos)
})

app.get('/api/cursos/programacion', (req, res) => {
    res.send(infoCursos.programacion)
})


app.get('/api/cursos/matematicas', (req, res) => {
    res.send(infoCursos.matematicas)
})


//Se define el puerto
const PUERTO = process.env.PORT || 3000

app.listen(PUERTO, () => {
    console.log(`Este servidor esta escuchando el puerto ${PUERTO}...`)
})
