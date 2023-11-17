import React from 'react'
import styles from './Action.module.scss'
const Action = () => {
  return (
    <div className={styles.actionContainer}>
        <div onClick={()=>invoice()} className={styles.action}>انشاء فاتورة</div>
        <div onClick={()=>invoice()} className={styles.action}>اضافة</div>
        <div onClick={()=>invoice()} className={styles.action}>تعديل</div>
    </div>
  )
}

export default Action