import React from 'react'
import './cardDetail.css'
import { useQuery } from '@apollo/client'
import { DETAIL_MOVIES } from '../graphql/query'
import StyledContentLoader from 'styled-content-loader'

export default function CardDetail() {
  const { data, loading, error } = useQuery(DETAIL_MOVIES)
  
  if (loading) {
    return <StyledContentLoader />
  }

  return (
      <>
      {
        data && !loading ?
      
      <div className="modal fade" id="modalDetailMovie" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header d-flex justify-content-center">
                <h5 className="modal-title" id="exampleModalLabel">Detail Movie</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
              <div className="movie-card">
                <div className="container-movie">
                  <a href="#"><img src={ data.detailMovie.poster_path } alt="cover" className="cover" height="300" width="200" /></a>
                  <div className="hero">
                    <div className="details">
                      <div className="title1">{ data.detailMovie.title } <span>{ data.detailMovie.popularity }<i className="fas fa-star"></i></span></div>
                    </div>
                  </div>
                  
                  <div className="description">
                    <div className="column1">
                    {  
                      data && !loading  ?
                      data.detailMovie.tags?.map((tag, i)=> 
                        <span
                        key={ i } 
                        className="tag"> { tag } </span>  
                      )
                      : null
                    }
                    </div>
                    <div className="column2">
                      <p>{ data.detailMovie.overview }</p>
                    </div>
                  </div>
                </div>
              </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      :null
      }
      </>
  )
}
