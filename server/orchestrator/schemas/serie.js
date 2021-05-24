const { gql } = require('apollo-server')
const axios = require('axios').default
const Redis = require('ioredis')

const redis = new Redis()

const varRedisSeries = 'entertainme:data:series'
const apiSeries = 'http://localhost:4002/series/'


const typeDefs = gql`

  type Serie {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type StatusSerie {
    message: String
  }

  input SerieInput {
    title: String!
    overview: String!
    poster_path: String!
    popularity: Float!
    tags: [String!]
  }

  extend type Query {
    series: [Serie]
    serie(_id: ID): Serie
  }

  extend type Mutation {
    addSerie(data: SerieInput): Serie
    updateSerie(_id: ID, data: SerieInput): StatusSerie
    deleteSerie(_id: ID): StatusSerie
  }
`

const resolvers = {
  Query: {
    series: async () => {
      try {
        const CACHE_FROM_REDIS = await redis.get(varRedisSeries)
        
        if (!CACHE_FROM_REDIS) {
          const { data } = await axios(apiSeries)
          redis.set(varRedisSeries, JSON.stringify(data))
          return data
        } else {
          return JSON.parse(CACHE_FROM_REDIS)
        }
      } catch (error) {
        console.log(error)
      }
    },
    serie: async (_, { _id }) => {
      try {
        const CACHE_FROM_REDIS = await redis.get(varRedisSeries)
        
        if (!CACHE_FROM_REDIS) {
          const { data } = await axios(apiSeries+_id)
          return data
        } else {
          const data = JSON.parse(CACHE_FROM_REDIS).filter(serie => serie._id === _id)[0] 
          return data
        }
      } catch (error) {
        console.log(error)
      }
    }
  },
  Mutation: {
    addSerie: async (_, { data: addSerie }) => {
      try {
        const { data } = await axios({
          url: apiSeries,
          method: 'POST',
          data: addSerie
        })
        redis.del(varRedisSeries)
        return data
      } catch (error) {
        console.log(error)
      }
    },
    updateSerie: async (_, { _id, data: updateSerie }) => {
      try {
        const { data } = await axios({
          url: apiSeries+_id,
          method: 'PUT',
          data: updateSerie
        })
        redis.del(varRedisSeries)
        return data
      } catch (error) {
        console.log(error)
      }
    },
    deleteSerie: async (_, {_id}) => {
      try {
        const { data } = await axios({
          url: apiSeries+_id,
          method: 'DELETE',
        })
        redis.del(varRedisSeries)
        return data
      } catch (error) {
        console.log(error);
      }
    }
  }
}

module.exports = {
  typeDefs,
  resolvers
}
