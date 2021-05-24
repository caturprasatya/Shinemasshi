import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_MOVIE, UPDATE_MOVIE, FETCH_ALL_DATA } from '../graphql/query'
import { useHistory } from 'react-router-dom'

export default function Form({ movie, loadingGetMovie, errorGetMovie }) {
  const [tags, setTags] = useState([])
  const [category, setCategory] = useState('')
  const [inputForm, setInputForm] = useState({
    title: '',
    overview: '',
    poster_path: '',
    popularity: 0
  })
  const [addMovie, { loading, data, error }] = useMutation(ADD_MOVIE, {
    refetchQueries: [{ query: FETCH_ALL_DATA }]
  })
  const [updateMovie, { data: updateData, loading: loadingUpdate }] = useMutation(UPDATE_MOVIE, {
    refetchQueries: [{ query: FETCH_ALL_DATA }]
  })

  const history = useHistory()

  function handleTags({ target }) {
    setCategory(target.value)
    console.log(target.value);
  }

  function handleSubmit(e) {
    e.preventDefault()
    const dataMovie = {
      ...inputForm,
      popularity: +inputForm.popularity,
      tags
    }
    if (!movie) {
      addMovie({
        variables: {
          newData: dataMovie
        }
      })
    } else {
      updateMovie({
        variables: {
          id: movie._id,
          updateData: dataMovie
        }
      })
    }
      history.push('/')
  }

  function handleChange(e) {
    const { name, value } = e.target

    setInputForm({ ...inputForm, [name]: value })
  }

  function handleClearTags(e) {
    e.preventDefault()
    setTags([])
  }

  function handleEnter(e) {
    if (e.code === 'Enter') {
      e.preventDefault()
      setTags([...tags, category])
      setCategory('')
    }
  }

  useEffect(() => {
    if (movie && !loadingGetMovie) {
      setInputForm({
        ...inputForm,
        popularity: movie.popularity,
        title: movie.title,
        overview: movie.overview,
        poster_path: movie.poster_path
      })
      setTags(movie.tags)
    }
  }, [movie, loadingGetMovie, inputForm])

  return (
    <div>
      <form className="mt-0" onSubmit={handleSubmit}>
        <h3 className="">{ movie ? 'Update' : 'Add' } Movie in Our Collection</h3>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <input type="text" name="title" className="form-control shadow" placeholder="Title Movie..." value={inputForm.title} onChange={handleChange} />
              <br />
            </div>
            <div className="form-group">
              <input type="text" name="poster_path" className="form-control shadow" placeholder="Poster Movie..." value={inputForm.poster_path} onChange={handleChange} />
              <br />
            </div>
            <div className="form-group">
              <input type="number" name="popularity" className="form-control shadow" placeholder="Popularity" value={inputForm.popularity} onChange={handleChange} />
              <br />
            </div>
            <div className="form-group">
              {
                !tags.length ? <></>
                  :
                  <div className="alert alert-warning alert-dismissible fade show h-1 shadow" role="alert">
                    {tags.map((cats, i) => !i ? cats : ', ' + cats)}
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={handleClearTags}></button>
                  </div>
              }
              <input type="text" name="tags" className="form-control shadow" placeholder="Category" value={category} onChange={handleTags} onKeyPress={handleEnter} />
              <br />
            </div>
            {
              movie ?
                <div className="form-group ">
                  <input type="submit" name="btnSubmit" className="btnContact shadow" value="Update Movie" />
                </div>
                :
                <div className="form-group ">
                  <input type="submit" name="btnSubmit" className="btnContact shadow" value="Send Movie" />
                </div>
            }
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <textarea name="overview" className="form-control shadow" placeholder="Overview" id="text-area" value={inputForm.overview} onChange={handleChange}></textarea>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
