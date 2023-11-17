import React, { useState } from 'react'
import styles from './Table.module.scss';
const Table = ({headers,data}) => {
    const [selectedID,setSelectedID] = useState("");
    const selectRow = (id) => {
        if(id == selectedID){
            setSelectedID("");
        }else{
            setSelectedID(id);
        }
    }
    
  return (
    <div className={styles.tablecontainer}>
        <table className={styles.styledtable}>
            <thead>
                <tr>
                {headers.map((header, index) => (
                    <th key={index}>{header}</th>
                ))}
                </tr>
            </thead>
            <tbody>
                {data.map((user, i) => (
                
                <tr style={{background:selectedID==user?.id&&'lightblue'}} onClick={()=>selectRow(user?.id)} key={i}>
                    <td>{user?.date?.toDate().toLocaleDateString('en-GB')}</td>
                    <td>{user?.number}</td>
                    <td>{user?.cur - user?.prev}</td>
                    <td>{user?.prev}</td>
                    <td>{user?.cur}</td>
                    <td>{user?.year}</td>
                    <td>{user?.month}</td>
                    <td>{user?.box}</td>
                    <td>{user?.name}</td>
                </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default Table