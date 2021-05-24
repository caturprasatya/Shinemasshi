const route = require('express').Router()
const MovieController = require('../controllers/')

route.get('/movies', MovieController.fetchMovies)

route.post('/movies', MovieController.addMovie)

route.get('/movies/:id', MovieController.getMovie)

route.put('/movies/:id', MovieController.updateMovie)

route.delete('/movies/:id', MovieController.deleteMovie)

module.exports = route
