const express = require('express')
const app = express()

const {infoCursos} = require('./cursos.js')

//routers
const routerProgramacion = express.Router();
app.use('/api/cursos/programacion', routerProgramacion);

const routerMatematicas = express.Router();
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

//cursos de programacion 

routerProgramacion.get('/:lenguaje', (req, res) => {
    const lenguaje = req.params.lenguaje
    const resultados = infoCursos.programacion.filter(curso => curso.lenguaje === lenguaje)

    if (resultados.length === 0 ) {
        return res.status(404).send(`No se encontraron cursos de ${lenguaje}.`)
    }

    if (req.query.ordenar === 'vistas') {
        return res.send(JSON.stringify(resultados.sort((a, b) => b.vistas - a.vistas)));
    }

    res.send(JSON.stringify(resultados));
})

routerProgramacion.get('/:lenguaje/:nivel', (req, res) => {
    const lenguaje = req.params.lenguaje
    const nivel = req.params.nivel

    const resultados = infoCursos.programacion.filter(curso => curso.lenguaje === lenguaje && curso.nivel === nivel)

    if (resultados.length === 0 ) {
        return res.status(404).send(`No se encontraron cursos de ${lenguaje} de nivel ${nivel}.`)
    }

    res.send(JSON.stringify(resultados));
})

//cursos de matematica

routerMatematicas.get('/:tema', (req, res) => {
    const tema = req.params.tema
    const resultados = infoCursos.matematicas.filter(curso => curso.tema === tema)

    if (resultados.length === 0 ) {
        return res.status(404).send(`No se encontraron cursos de ${tema}.`)
    }

    res.send(JSON.stringify(resultados));
})

routerMatematicas.get('/:tema/:nivel', (req, res) => {
    const tema = req.params.tema
    const nivel = req.params.nivel

    const resultados = infoCursos.matematicas.filter(curso => curso.tema === tema && curso.nivel === nivel)

    if (resultados.length === 0 ) {
        return res.status(404).send(`No se encontraron cursos de ${tema} de nivel ${nivel}.`)
    }

    res.send(JSON.stringify(resultados));
})

//Se define el puerto
const PUERTO = process.env.PORT || 3000

app.listen(PUERTO, () => {
    console.log(`Este servidor esta escuchando el puerto ${PUERTO}...`)
})
