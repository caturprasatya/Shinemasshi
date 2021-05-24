const { gql } = require('@apollo/client')

export const FETCH_ALL_DATA = gql`
  query fetchAllData {
    movies {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
    series {
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`

export const GET_SERIE = gql`
  query Serie($id: ID){
    Serie(_id: $id){
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`

export const GET_MOVIE = gql`
  query Movie( $id: ID ){
    movie( _id: $id ){
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`

export const DELETE_MOVIE = gql`
  mutation DeleteMovie( $id: ID ){
    deleteMovie( _id: $id ){
      message
    }
  }
`

export const ADD_MOVIE = gql`
  mutation AddMovie($newData: MovieInput){
    addMovie(data: $newData){
      _id
      title
      overview
      poster_path
      popularity
      tags
    }
  }
`

export const UPDATE_MOVIE = gql`
  mutation UpdateMovie($id: ID ,$updateData: MovieInput){
    updateMovie(_id: $id, data: $updateData){
      message
    }
  }
`

export const GET_FAVORITE_USER = gql`
  query GetFavoriteUser{
    favoriteUser @client
  }
`

export const DETAIL_MOVIES = gql`
  query GetDetailMovies{
    detailMovie @client
  }
`
