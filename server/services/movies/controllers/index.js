const Movie = require('../models/')
const Redis = require('ioredis')

const redis = new Redis()
const CACHE_MOVIES = 'entertainme:data:movies'

class ControllerMovie {

  static async fetchMovies(req, res, next) {
    try {
      const CACHE_FROM_REDIS = await redis.get(CACHE_MOVIES)

      if (!CACHE_FROM_REDIS) {
        const data = await Movie.findAll()
        redis.set(CACHE_MOVIES, JSON.stringify(data))
        res.status(200).json(data)
      } else {
        console.log('DATA CACHE');
        res.status(200).json(JSON.parse(CACHE_FROM_REDIS))
      }
    } catch(error){
      next(error)
    }
  }

  static async getMovie(req, res, next) {
    const { id } = req.params
    try {
      const CACHE_FROM_REDIS = await redis.get(CACHE_MOVIES)

      if (!CACHE_FROM_REDIS) {
        const data = await Movie.findOne(id)

        res.status(200).json(data)
      } else {
        const data = JSON.parse(CACHE_FROM_REDIS).filter(movie => movie._id === id)[0]

        if(!data)next({code:404, message: 'Cannot find this movie'})
        res.status(200).json(data)
      }
    } catch (error) {
      next(error)
    }
  }

  static async addMovie(req, res, next) {
    const { title, overview, poster_path, tags } = req.body
    const popular = req.body.popularity
    const dataMovie = { title, overview, poster_path, popularity: +popular, tags }
    
    try {
      const data = await Movie.create(dataMovie)
      res.status(201).json(data.ops[0])
      redis.del(CACHE_MOVIES)
    } catch (error) {
      next(error)
    }
  }

  static async updateMovie(req, res, next) {
    const { id } = req.params
    const { title, overview, poster_path, popularity, tags } = req.body
    const dataMovie = { title, overview, poster_path, popularity, tags }

    try {
      await Movie.update(id, dataMovie)
      res.status(200).json({ message: 'successfully updated'})
      redis.del(CACHE_MOVIES)
    } catch (error) {
      next(error) 
    }
  }

  static async deleteMovie(req, res, next) {
    const { id } = req.params
    try {
      await Movie.delete(id)
      res.status(200).json({ message: 'successfully deleted'})
      redis.del(CACHE_MOVIES)
    } catch (error) {
      next(error) 
    }
  }
}

module.exports = ControllerMovie
