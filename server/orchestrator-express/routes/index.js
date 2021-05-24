const route = require('express').Router()
const MainController = require('../controllers/mainController')
const movieRoute = require('./movieRoute')
const serieRoute = require('./serieRoute')

route.get('/entertainme/', MainController.fetchAllData)

route.use('/entertainme/movies', movieRoute)

route.use('/entertainme/series', serieRoute)

module.exports = route
