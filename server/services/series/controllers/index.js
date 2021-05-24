const TvSerie = require('../models/')
const Redis = require('ioredis')

const redis = new Redis()
const CACHE_SERIES = 'entertainme:data:series'

class ControllerTvSerie {

  static async fetchTvSeries(req, res, next) {
    try {
      const CACHE_FROM_REDIS = await redis.get(CACHE_SERIES)

      if (!CACHE_FROM_REDIS) {
        const data = await TvSerie.findAll()
        redis.set(CACHE_SERIES, JSON.stringify(data))
        res.status(200).json(data)
      } else {
        res.status(200).json(JSON.parse(CACHE_FROM_REDIS))
      }
    } catch (error) {
      next(error)
    }
  }

  static async getTvSerie(req, res, next) {
    const { id } = req.params
    try {
      const CACHE_FROM_REDIS = await redis.get(CACHE_SERIES)
      if (!CACHE_FROM_REDIS) {
        const data = await TvSerie.findOne(id)
        console.log(data)
        res.status(200).json(data)
      } else {
        const data = JSON.parse(CACHE_FROM_REDIS).filter(serie => serie._id === _id)[0]

        if(!data)next({code:404, message: 'Cannot find this serie'})

        res.status(200).json(data)
      }
    } catch (error) {
      next(error)
    }
  }

  static async addTvSerie(req, res, next) {
    const { title, overview, poster_path, tags } = req.body
    const popular = req.body.popularity
    const dataTvSeries = { title, overview, poster_path, popularity: +popular, tags }
    try {
      const data = await TvSerie.create(dataTvSeries)
      redis.del(CACHE_SERIES)
      res.status(201).json(data.ops[0])
    } catch (error) {
      next(error)      
    }
  }

  static async updateTvSerie(req, res, next) {
    const { id } = req.params
    const { title, overview, poster_path, popularity, tags } = req.body
    const dataTvSeries = { title, overview, poster_path, popularity, tags }

    try {
      await TvSerie.update(id, dataTvSeries)
      redis.del(CACHE_SERIES)
      res.status(200).json({ message: 'successfully updated'})
    } catch (error) {
      next(error)
    }
  }
  static async deleteTvSerie(req, res, next) {
    const { id } = req.params
    try {
      await TvSerie.delete(id)
      redis.del(CACHE_SERIES)
      res.status(200).json({ message: 'successfully deleted'})
    } catch (error) {
      next(error)
    }
  }
}

module.exports = ControllerTvSerie
