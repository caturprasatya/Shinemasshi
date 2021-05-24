import { ApolloClient, InMemoryCache } from '@apollo/client'
import { favoriteVar, detailMovieVar } from './cache'

const client =  new ApolloClient ({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache({
    typePolicies:{
      Query: {
        fields: {
          favoriteUser : {
            read(){
              return favoriteVar()
            }
          },
          detailMovie : {
            read(){
              return detailMovieVar()
            }
          }
        }
      }
    }
  })
})

export default client
