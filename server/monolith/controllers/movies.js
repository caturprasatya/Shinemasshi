const Movie = require('../models/movie')

class ControllerMovie {

  static async fetchMovies(req, res, next) {
    try {
      const data = await Movie.findAll()
      res.status(200).json(data)
    } catch (error) {
      console.log(error);
    }
  }

  static async getMovie(req, res, next) {
    const { id } = req.params
    try {
      const data = await Movie.findOne(id)
      res.status(200).json(data)
    } catch (error) {
      console.log(error);      
    }
  }

  static async addMovie(req, res, next) {
    const { title, overview, poster_path, popularity } = req.body
    const tags = req.body.tags.split(',')
    const dataMovie = { title, overview, poster_path, popularity, tags }
    try {
      const data = await Movie.create(dataMovie)
      res.status(201).json(data)
    } catch (error) {
      console.log(error);      
    }
  }

  static async updateMovie(req, res, next) {
    const { id } = req.params
    const { title, overview, poster_path, popularity, tags } = req.body

    const dataMovie = { title, overview, poster_path, popularity, tags }

    try {
      const data = await Movie.update(id, dataMovie)
      res.status(200).json(data)
    } catch (error) {
      console.log(error);      
    }
  }
  static async deleteMovie(req, res, next) {
    const { id } = req.params
    try {
      const data = await Movie.delete(id)
      res.status(200).json(data)
    } catch (error) {
      console.log(error);      
    }
  }

}

module.exports = ControllerMovie
