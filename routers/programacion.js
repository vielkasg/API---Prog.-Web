const express = require('express');
const routerMatematicas = require('./matematicas.js');

const {programacion} = require ('../datos/cursos.js').infoCursos;

const routerProgramacion = express.Router();

routerProgramacion.get('/:lenguaje', (req, res) => {
    const lenguaje = req.params.lenguaje
    const resultados = programacion.filter(curso => curso.lenguaje === lenguaje)

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

    const resultados = programacion.filter(curso => curso.lenguaje === lenguaje && curso.nivel === nivel)

    if (resultados.length === 0 ) {
        return res.status(404).send(`No se encontraron cursos de ${lenguaje} de nivel ${nivel}.`)
    }

    res.send(JSON.stringify(resultados));
})


routerProgramacion.post('/crearcurso', (req, res) =>{
   const {body} = req;
   programacion.push(body);
   res.send(JSON.stringify(programacion));
})

routerProgramacion.put('/editarcurso/:id', (req, res) =>{
    const {body} = req;
    const id = req.params.id;

    const indice = programacion.findIndex (curso => curso.id = id);

    if (indice >= 0){
        programacion[indice] = body;
    }
    res.send(JSON.stringify(programacion));
 })

 routerProgramacion.patch('/modificarcurso/:id', (req, res) =>{
    const {body} = req;
    const id = req.params.id;

    const indice = programacion.findIndex (curso => curso.id = id);

    if (indice >= 0){
        programacion[indice] = body;
    }
    res.send(JSON.stringify(programacion));
 })

 routerProgramacion.delete('/eliminarcurso/:id', (req, res) =>{
    const {body} = req;
    const id = req.params.id;

    const indice = programacion.findIndex (curso => curso.id = id);

    if (indice >= 0){
        programacion.splice(indice, 1) ;
    }
    res.send(JSON.stringify(programacion));
 })
 

module.exports = routerProgramacion;