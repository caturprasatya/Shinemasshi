const { gql } = require('apollo-server')
const axios = require('axios').default
const Redis = require('ioredis')

const redis = new Redis()
const CACHE_MOVIES = 'entertainme:data:movies'
const apiMovies = 'http://localhost:4001/movies/'


const typeDefs = gql`

  type Movie {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }

  type Status {
    message: String
  }

  input MovieInput {
    title: String!
    overview: String!
    poster_path: String!
    popularity: Float!
    tags: [String!]
  }

  extend type Query {
    movies: [Movie]
    movie(_id: ID): Movie
  }

  extend type Mutation {
    addMovie(data: MovieInput): Movie
    updateMovie(_id: ID, data: MovieInput): Status
    deleteMovie(_id: ID ): Status
  }
`

const resolvers = {
  Query: {
    movies: async () => {
      try {
        const CACHE_FROM_REDIS = await redis.get(CACHE_MOVIES)

        if (!CACHE_FROM_REDIS) {
          const { data } = await axios(apiMovies)
          
          redis.set(CACHE_MOVIES, JSON.stringify(data))
          return data
        } else {
          return JSON.parse(CACHE_FROM_REDIS)
        }
      } catch (error) {
        console.log(error)
      }
    },
    movie: async (_, { _id }) => {
      try {
        const CACHE_FROM_REDIS =await redis.get(CACHE_MOVIES)

        if (!CACHE_FROM_REDIS) {
          const { data } = await axios(apiSeries+_id)
          return data
        } else {
          const data = JSON.parse(CACHE_FROM_REDIS).filter(movie => movie._id === _id)[0]
          return data
        }
      } catch (error) {
        console.log(error)
      }
    }
  },
  Mutation: {
    addMovie: async (_, { data: addMovie }) => {
      try {
        const { data } = await axios({
          url: apiMovies,
          method: 'POST',
          data: addMovie
        })
        redis.del(CACHE_MOVIES)
        return data
      } catch (error) {
        console.log(error)
      }
    },
    updateMovie: async (_, { _id, data: updateMovie }) => {
      try {
        const { data } = await axios({
          url: apiMovies+_id,
          method: 'PUT',
          data: updateMovie
        })
        redis.del(CACHE_MOVIES)
        console.log(data);
        return data
      } catch (error) {
        console.log(error)
      }
    },
    deleteMovie: async (_, {_id}) => {
      try {
        const { data } = await axios({
          url: apiMovies+_id,
          method: 'DELETE',
        })
        redis.del(CACHE_MOVIES)
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