import React from 'react'
import './form.css'
import Form from '../components/Form'
import { useParams } from 'react-router-dom'
import { GET_MOVIE } from '../graphql/query'
import { useQuery } from '@apollo/client'

export default function AddMovie() {
  const { id } = useParams()
  const { data, loading, error } = useQuery(
    GET_MOVIE,{
      variables: {
        id
      }
    }
  )
  return (
    <div className="container contact-form shadow">
      <div className="contact-image">
          <img src="https://cdn.dribbble.com/users/334538/screenshots/2713453/movie_night.jpg?compress=1&resize=800x600" alt="rocket_contact"/>
      </div>
        <Form 
        movie={ !loading ? data.movie : [] }
        loadingGetMovie={ loading }
        errorGetMovie={ error }
        />
    </div>
  )
}
