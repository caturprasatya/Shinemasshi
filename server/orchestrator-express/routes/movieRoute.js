const route = require('express').Router()
const MovieController =  require('../controllers/movieController')

route.get('/', MovieController.fetchMovies)

route.post('/', MovieController.addMovie)

route.get('/:id', MovieController.getMovie)

route.put('/:id', MovieController.updateMovie)

route.delete('/:id', MovieController.deleteMovie)

module.exports = route
