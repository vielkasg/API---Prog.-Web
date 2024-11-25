const express = require('express')

const {matematicas} = require ('../datos/cursos.js').infoCursos;

const routerMatematicas = express.Router();

routerMatematicas.get('/:tema', (req, res) => {
    const tema = req.params.tema
    const resultados = matematicas.filter(curso => curso.tema === tema)

    if (resultados.length === 0 ) {
        return res.status(404).send(`No se encontraron cursos de ${tema}.`)
    }

    res.send(JSON.stringify(resultados));
})

routerMatematicas.get('/:tema/:nivel', (req, res) => {
    const tema = req.params.tema
    const nivel = req.params.nivel

    const resultados = matematicas.filter(curso => curso.tema === tema && curso.nivel === nivel)

    if (resultados.length === 0 ) {
        return res.status(404).send(`No se encontraron cursos de ${tema} de nivel ${nivel}.`)
    }

    res.send(JSON.stringify(resultados));
})

module.exports = routerMatematicas;