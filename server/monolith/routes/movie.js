const route = require('express').Router()
const ControllerMovie = require('../controllers/movies')

route.get('/', ControllerMovie.fetchMovies)

route.post('/', ControllerMovie.addMovie)

route.get('/:id', ControllerMovie.getMovie)

route.put('/:id', ControllerMovie.updateMovie)

route.delete('/id', ControllerMovie.deleteMovie)

module.exports = route
