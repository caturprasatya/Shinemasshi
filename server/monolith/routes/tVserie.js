const route = require('express').Router()
const ControllerTvSerie = require('../controllers/tvSeries')

route.get('/', ControllerTvSerie.fetchTvSeries)

route.post('/', ControllerTvSerie.addTvSerie)

route.get('/:id', ControllerTvSerie.getTvSerie)

route.put('/:id', ControllerTvSerie.updateTvSerie)

route.delete('/:id', ControllerTvSerie.deleteTvSerie)

module.exports = route
