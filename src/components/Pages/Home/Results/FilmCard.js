import React from 'react'
import styles from './FilmCard.module.css'
const FilmCard = props => {
  return (
    <div className={styles.film} onClick={e => props.onClick(e, props.id)}>
      <img src={"https://image.tmdb.org/t/p/original"+props.img} alt="Poster"/>
      <div >
      <h5>{props.title}</h5>
      <p>{props.body}</p>
      </div>
    </div>
  )
}

export default FilmCard
