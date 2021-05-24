import React from 'react'
import './card.css'
import { favoriteVar, detailMovieVar } from '../graphql/cache'
import Swal from 'sweetalert2'
import { useHistory } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { DELETE_MOVIE, FETCH_ALL_DATA } from '../graphql/query'

export default function Card({ movie, editable, inHome, loading }) {
  const history = useHistory()
  const [ deleteMovie, {  data }] = useMutation(DELETE_MOVIE, {
    refetchQueries: [{ query: FETCH_ALL_DATA }]
  })
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  })

  function addFavorite(e) {
    e.preventDefault()
    const currentFavoriteUser = favoriteVar()
    const filter = currentFavoriteUser.filter(data => data._id === movie._id)[0]
    if (!filter) {
      favoriteVar([movie, ...currentFavoriteUser])
      Toast.fire({
        icon: 'success',
        title: 'Successfully add new favorite'
      })
    } else {
      history.push('/favorite')
    }
  }

  function updatedMovie(e){
    e.preventDefault()
    history.push(`/edit/${movie._id}`)
  }

  function getDetailMovie(e){
    e.preventDefault()
    detailMovieVar(movie)
  }

  function handleDelete(e){
    e.preventDefault()
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMovie({
          variables: {
            id: movie._id
          }
        })
        Swal.fire(
          'Deleted!',
          'Your collection film has been deleted.',
          'success'
        )
      }
    })
  }

  return (
    <div className="col-md-4">
      <hr />
      <div className="profile-card-2 shadow"><img src={ movie.poster_path } className="img img-responsive" alt="poster" height="500"/>
        <div className="card-img-overlay d-flex justify-content-between">
        { inHome ? 
          <span className="card-link text-warning h4" onClick={ addFavorite }>
            <i className="far fa-crown"></i>
          </span>
        : <></>
        }
          <span className="card-link text-warning h4" onClick={ getDetailMovie }>
            <i className="fas fa-info-circle" data-bs-toggle="modal" data-bs-target="#modalDetailMovie" ></i>
          </span>
        </div>
        <div className="bg-name">
        <div className="profile-name">{ movie.title }</div>
        {
          editable ?
            <div className="card-footer h6 d-flex flex-between" height="100" >
              <div className="profile-icons">
              <a href="." onClick={ updatedMovie }><i className="fas fa-edit"></i></a>    <a href="true" onClick={ handleDelete }><i className="far fa-trash-alt"></i></a>
              </div>
            </div>
          : <></>
        }
        </div>
    </div>
    {
    }
  </div>
  )
}
