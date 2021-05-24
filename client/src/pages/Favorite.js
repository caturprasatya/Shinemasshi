import React from 'react'
import { GET_FAVORITE_USER }  from '../graphql/query'
import { useQuery } from '@apollo/client'
import Card from '../components/Card'
import StyledContentLoader from 'styled-content-loader'
import CardDetail from '../components/CardDetail'

export default function Favorite() {

  const { data, loading, error } = useQuery(GET_FAVORITE_USER)

  if (loading) {
    return <StyledContentLoader />
  }

  return (
    <div className="container">
      <div className="row">
        {
          data.favoriteUser ?
          data.favoriteUser.map(movie => 
            <Card
            key={ movie._id }
            movie={ movie }
            editable={ false }
            inHome= { false }
            />
          )
          : 
          <></>
        }
      </div>
      <CardDetail/>
    </div>
  )
}
