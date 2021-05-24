const TvSerie = require('../models/tvSerie')

class ControllerTvSerie {

  static async fetchTvSeries(req, res, next) {
    try {
      const data = await TvSerie.findAll()
      res.status(200).json(data)
    } catch (error) {
      console.log(error);      
    }
  }

  static async getTvSerie(req, res, next) {
    const { id } = req.params
    try {
      const data = await TvSerie.findOne(id)
      res.status(200).json(data)
    } catch (error) {
      console.log(error);      
    }
  }

  static async addTvSerie(req, res, next) {
    const { title, overview, poster_path, popularity } = req.body
    const tags = req.body.tags.split(',')
    const dataTvSeries = { title, overview, poster_path, popularity, tags }
    try {
      const data = await TvSerie.create(dataTvSeries)
      res.status(201).json(data)
    } catch (error) {
      console.log(error);      
    }
  }

  static async updateTvSerie(req, res, next) {
    const { id } = req.params
    const { title, overview, poster_path, popularity, tags } = req.body
    const dataTvSeries = { title, overview, poster_path, popularity, tags }

    try {
      const data = await TvSerie.update(id, dataTvSeries)
      res.status(200).json(data)
    } catch (error) {
      console.log(error);      
    }
  }
  static async deleteTvSerie(req, res, next) {
    const { id } = req.params
    try {
      const data = await TvSerie.delete(id)
      res.status(200).json(data)
    } catch (error) {
      console.log(error);      
    }
  }
  
}

module.exports = ControllerTvSerie
