const route = require('express').Router()
const TvSeriesController = require('../controllers/')

route.get('/series', TvSeriesController.fetchTvSeries)

route.post('/series', TvSeriesController.addTvSerie)

route.get('/series/:id', TvSeriesController.getTvSerie)

route.put('/series/:id', TvSeriesController.updateTvSerie)

route.delete('/series/:id', TvSeriesController.deleteTvSerie)

module.exports = route
