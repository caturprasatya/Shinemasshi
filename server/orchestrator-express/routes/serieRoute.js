const route = require('express').Router()
const SeriesController = require('../controllers/serieController')

route.get('/', SeriesController.fetchSeries)

route.post('/', SeriesController.addSerie)

route.get('/:id', SeriesController.getSerie)

route.put('/:id', SeriesController.updateSerie)

route.delete('/:id', SeriesController.deleteSerie)

module.exports = route
