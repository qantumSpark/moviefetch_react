import React from 'react'
import styles from './Input.module.css'

const Input = props => {
  return (
    <div className={styles.container}>
      <input type="text" onKeyPress={props.handleKeyPress} placeholder="Rechercher un film"/>
    </div>
  )
}

export default Input
