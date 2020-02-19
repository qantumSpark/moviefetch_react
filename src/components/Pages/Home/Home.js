import React, { useState }from 'react'
import Input from './Input/Input'
import Results from './Results/Results'
import styles from './Home.module.css'


//Store la derniere recherche
let lastReq = []
const Home = (props) => {
  // eslint-disable-next-line
  let requestPage = 1
  const [films, setFilms] = useState(lastReq)
  
  const handleKeyPress = async event => {
    if (event.key === "Enter"){
      let inputValue = event.target.value;
      let data = await fetchFilms(inputValue)
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
async function fetchFilms(query){
  let url = `/api/${query}`
  let response = await fetch(url).catch(err => console.log(err))
  let data = await response.json()
  console.log(data);
  return data
}
export default Home
