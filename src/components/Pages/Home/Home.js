import React, { useState }from 'react'
import Input from './Input/Input'
import Results from './Results/Results'
import styles from './Home.module.css'

import * as config from '../../../config/config'

let lastReq = []
const Home = (props) => {
  let requestPage = 1
  const [films, setFilms] = useState(lastReq)
  
  const handleKeyPress = async event => {
    if (event.key === "Enter"){
      let inputValue = event.target.value;

      let data = await fetchFilms(inputValue, requestPage, config.API_KEY)


      console.log("From HOME : List of films: ", data.results);
      setFilms(data.results)
      lastReq = data.results
    }
  }

  return (
    <div className={styles.home}>
      <Input handleKeyPress={handleKeyPress}/>
      <Results films= {films} onClick={props.onClick}/>
    </div>
  )
}
async function fetchFilms(query, page, apiKey){
  let url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${query}&page=${page}&include_adult=false`
  console.log(url);
  let response = await fetch(url)
  let data = await response.json()
  return data
}
export default Home
//https://api.themoviedb.org/3/movie/76341?api_key=<<api_key>>