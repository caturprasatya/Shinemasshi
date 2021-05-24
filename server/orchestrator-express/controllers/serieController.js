const axios = require('axios').default
const Redis = require('ioredis')

const redis = new Redis()
const CACHE_ALL_DATA = 'entertainme:data:all'
const CACHE_SERIES = 'entertainme:data:series'
const apiSeries = 'http://localhost:4002/series'

class SerieController {
  
  static async fetchSeries(req, res, next) {
    try {
      const CACHE_FROM_REDIS = await redis.get(CACHE_SERIES)
      
      if (!CACHE_FROM_REDIS) {
        const { data } = await axios(apiSeries)

        redis.set(CACHE_SERIES, JSON.stringify(data))
        res.status(200).json(data)
      } else {
        res.status(200).json(JSON.parse(CACHE_FROM_REDIS))
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async getSerie(req, res, next) {
    const { id } = req.params
    
    try {

      const CACHE_FROM_REDIS = await redis.get(CACHE_SERIES)
      if ('') {
        const { data }= await axios(`${apiSeries}/${id}`)
        res.status(200).json(data)
      } else {
        const data = JSON.parse(CACHE_FROM_REDIS).filter(serie => serie._id === id )[0] 
        res.status(200).json(data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  static async addSerie(req, res, next) {
    const { title, overview, poster_path, popularity } = req.body
    const tags = req.body.tags.split(',')
    const dataSerie = { title, overview, poster_path, popularity, tags }

    try {
      const { data } = await axios({
        url: apiSeries,
        method: 'POST',
        data: dataSerie
      })
      redis.del(CACHE_SERIES)
      redis.del(CACHE_ALL_DATA)
      res.status(201).json(data)
    } catch (error) {
      console.log(error);      
    }
  }

  static async updateSerie(req, res, next) {
    const { id } = req.params
    const { title, overview, poster_path, popularity, tags } = req.body
    const dataSerie = { title, overview, poster_path, popularity, tags }

    try {
      const { data } = await axios({
        url: apiSeries+'/'+id,
        method: 'PUT',
        data: dataSerie
      })
      redis.del(CACHE_SERIES)
      redis.del(CACHE_ALL_DATA)
      res.status(200).json(data)
    } catch (error) {
      console.log(error);      
    }
  }

  static async deleteSerie(req, res, next) {
    const { id } = req.params

    try {
      const { data } = await axios({
        url: apiSeries+'/'+id,
        method: 'DELETE',
      })
      redis.del(CACHE_SERIES)
      redis.del(CACHE_ALL_DATA)
      res.status(200).json(data)
    } catch (error) {
      console.log(error);      
    }
  }

}

module.exports = SerieController
