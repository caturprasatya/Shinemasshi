const axios = require('axios').default
const Redis = require('ioredis')

const redis = new Redis()
const CACHE_ALL_DATA = 'entertainme:data:all'

class MainController {
  
  static async fetchAllData(req, res, next) {
    try {
      
      const urls = [
        'http://localhost:4001/movies',
        'http://localhost:4002/series'
      ]
      const requests = urls.map(url => axios(url))
      
      const CACHE_FROM_REDIS = await redis.get(CACHE_ALL_DATA)
      
      if (!CACHE_FROM_REDIS) {
        Promise.all(requests)
        .then(response => {
          const data = {
            movies: response[0].data,
            tvSeries: response[1].data
          }
          redis.set(CACHE_ALL_DATA, JSON.stringify(data))
          res.status(200).json(data)
        })
        .catch(err => {
          console.log(err);
        })
      } else {
        res.status(200).json(JSON.parse(CACHE_FROM_REDIS))
      }
    } catch (error) {
      console.log(error);
    }     
  }
}

module.exports = MainController
