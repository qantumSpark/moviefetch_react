import React, { useState } from 'react'
import * as api from '../../../util/localAPI'
import FilmCard from '../Home/Results/FilmCard'
import styles from './MyFilms.module.css'
const MyFilms = () => {

  const [list, setList] = useState(api.getCollection("Films")) 

  const onClick = (e, id) => {
    api.deleteItem("Films", id)
    setList(api.getCollection("Films"))

  }
  const card = list.map(film => {
    console.log(film);
    return <FilmCard 
    key={film.id} 
    id={film.id}
    title={film.body.title}
    img={film.body.poster_path}
    body={film.body.overview}
    onClick = {onClick} 
    />
  })
  return (
    <div className={styles.container}>
      {card}
    </div>
  )
}

export default MyFilms
