const route = require('express').Router()
const routeMovie = require('./movie')
const routeTvSerie = require('./tVserie')

route.use('/movies', routeMovie)

route.use('/tvseries', routeTvSerie)

module.exports = route
