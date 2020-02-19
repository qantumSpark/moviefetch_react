import React, {useState} from 'react'
import * as api from '../../../util/localAPI'
import styles from './Film.module.css'
const Project = (props) => {
 
  const [film, setFilm] = useState([])

  const getDetails = async () => {
    let details = await fetchFilms(props.id)
    setFilm(details)
  }
  if(film.length === 0){
    getDetails()
  }
  const getGenres = () => {
    let genres = ""
    if(film.genres !== undefined){
      genres = film.genres.map(genre => "/ "+genre.name+" /").concat()
      console.log(genres);
    }
  return <p>{genres}</p>
  }
  const addClick = (event, film) => {
    const forLocalStorage = {
      id: film.id,
      body: film
    }
    api.addItem('Films', forLocalStorage)
  }
    return (
      <div className={styles.container}>
        <h1>{film.original_title}</h1>
        <p className={styles.add} onClick={(e)=> addClick(e, film)}>+</p>
        <img src={`https://image.tmdb.org/t/p/original${film.backdrop_path}`} alt=""/>
        {getGenres()}
        <div className={styles.infos}>
          <p>Release date : <br/>{film.release_date}</p>
          <p>Status : {film.status} </p>
          <p className={styles.popularity}><br/>{film.popularity} *</p>
          <p>Original language : {film.original_language} </p>
        </div>
        <p className={styles.overview}>{film.overview}</p>
      </div>
    )
}
async function fetchFilms(id){
  let response = await fetch(`/api/film/${id}`)
  let data = await response.json()
  return data
}
export default Project
