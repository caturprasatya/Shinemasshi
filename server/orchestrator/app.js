const { ApolloServer, gql } = require('apollo-server')
const { merge } = require('lodash');
const {
  typeDefs : typeDefsMovie,
  resolvers : resolversMovie
} = require('./schemas/movie')
const {
  typeDefs : typeDefsSerie,
  resolvers : resolversSerie
} = require('./schemas/serie')

const rootTypeDefs = gql`
  type Query {
    _empty: String 
  }
  type Mutation {
    _empty: String 
  }
`

const server = new ApolloServer({ 
  typeDefs: [rootTypeDefs, typeDefsMovie, typeDefsSerie],
  resolvers: merge({}, resolversMovie, resolversSerie)
})

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
