const axios = require('axios').default
const Redis = require('ioredis')

const redis = new Redis()
const CACHE_ALL_DATA = 'entertainme:data:all'
const CACHE_MOVIES = 'entertainme:data:movies'
const apiMovies = 'http://localhost:4001/movies'


class MovieController {
  
  static async fetchMovies(req, res, next) {
    try {
      const CACHE_FROM_REDIS = await redis.get(CACHE_MOVIES)
      if (!CACHE_FROM_REDIS) {
        const { data } = await axios(apiMovies)

        redis.set(CACHE_MOVIES, JSON.stringify(data))
        res.status(200).json(data)
      } else {
        res.status(200).json(JSON.parse(CACHE_FROM_REDIS))
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async getMovie(req, res, next) {
    const { id } = req.params
    
    try {
      const CACHE_FROM_REDIS = await redis.get(CACHE_MOVIES)

      if (!CACHE_FROM_REDIS) {
        const { data }= await axios(`${apiMovies}/${id}`)
        res.status(200).json(data)
      } else {
        const data = JSON.parse(CACHE_FROM_REDIS).filter(movie => movie._id === id )[0] 
        res.status(200).json(data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  static async addMovie(req, res, next) {
    const { title, overview, poster_path, popularity } = req.body
    const tags = req.body.tags.split(',')
    const dataMovie = { title, overview, poster_path, popularity, tags }

    try {
      const { data } = await axios({
        url: apiMovies,
        method: 'POST',
        data: dataMovie
      })
      redis.del(CACHE_MOVIES)
      redis.del(CACHE_ALL_DATA)
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
      const { data } = await axios({
        url: apiMovies+'/'+id,
        method: 'PUT',
        data: dataMovie
      })
      redis.del(CACHE_MOVIES)
      redis.del(CACHE_ALL_DATA)
      res.status(200).json(data)
    } catch (error) {
      console.log(error);      
    }
  }

  static async deleteMovie(req, res, next) {
    const { id } = req.params

    try {
      const { data } = await axios({
        url: apiMovies+'/'+id,
        method: 'DELETE',
      })
      redis.del(CACHE_MOVIES)
      redis.del(CACHE_ALL_DATA)
      res.status(200).json(data)
    } catch (error) {
      console.log(error);      
    }
  }

}

module.exports = MovieController
