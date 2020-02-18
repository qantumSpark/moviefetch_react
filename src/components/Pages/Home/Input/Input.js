import React from 'react'
import styles from './Input.module.css'
const Input = props => {


  return (
    <div className={styles.container}>
      <input type="text" onKeyPress={props.handleKeyPress}/>
    </div>
  )
}

export default Input
