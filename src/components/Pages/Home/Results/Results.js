import React from 'react'
import FilmCard from './FilmCard'
const Results = props => {
  console.log("From Results: ",props);
  const populateResult = () => {
    return props.films.map(film => {
      return <FilmCard 
        key={film.id} 
        id={film.id}
        title={film.title}
        img={film.poster_path}
        body={film.overview} 
        onClick={props.onClick}
        />
    })
  }



  return (
    <div className={'results'}>
      {populateResult()}
    </div>
  )



  
}

export default Results
