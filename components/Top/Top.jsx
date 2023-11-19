import React from 'react'
import styles from './Top.module.scss'
const Top = ({name}) => {
  return (
    <div className={styles.top}>
        <h1>{name}</h1>
    </div>
  )
}

export default Top