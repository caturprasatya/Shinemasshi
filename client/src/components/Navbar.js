import React from 'react'
import './navbar.css'
import { useHistory } from 'react-router-dom'

export default function Navbar() {
  const history =  useHistory()

  function homePage(e){
    e.preventDefault()
    history.push('/')
  }

  function addPage(e){
    e.preventDefault()
    history.push('/add')
  }

  function favoritePage(e){
    e.preventDefault()
    history.push('/favorite')
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light shadow">
      <div className="container-fluid p-0">
          <a className="navbar-brand navbar-left m-0" onClick={ homePage } href=".">Popcorn<span>Flix</span></a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        <div className="collapse navbar-collapse " id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto navbar-right">
            <li className="nav-item active">
              <a className="nav-link" href="true" onClick={ homePage }>Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="true" onClick={ favoritePage }>Favorite</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="true" onClick={ addPage }>Add Movie</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
