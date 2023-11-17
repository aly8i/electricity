import React from 'react'
import styles from './Filter.module.scss'
import { useState,useEffect,useContext } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { UserContext } from '../../context/Usercontext';

const Filter = () => {
    const { data,setFData } = useContext(UserContext);
    const [box,setBox] = useState("");
    const [name,setName] = useState("");
    const [month,setMonth] = useState("");
    const [year,setYear] = useState("");
    const [number,setNumber] = useState("");
    const [date,setDate] = useState(null);
    useEffect(()=>{
        const filtered = data.filter((user)=>user?.name.includes(name)&&user?.box.includes(box)&&(month==""||user?.month==month)&&(year==""||user?.year==year)&&user?.number.includes(number)&&(date==null||user?.date?.toDate()?.toString()==date?.toString()))
        console.log(name,box,number,month,year,date)
        setFData(filtered);
    },[box,month,year,number,date,name])

  return (
    <div className={styles.filterContainer}>
        <div className={styles.field}>
            <p className="title">تاريخ الدفع</p>
            <DatePicker
                selected={date}
                onChange={(e)=>setDate(e)}
                dateFormat="dd/MM/yyyy"
                isClearable
            />
        </div>
        <div className={styles.field}>
            <p className="title">رقم الهاتف</p>
            <input type="number" onChange={(e)=>setNumber(e.target.value)} value={number}/>
        </div>
        <div className={styles.field}>
            <p className="title">السنة</p>
            <input type="number" onChange={(e)=>setYear(e.target.value)} value={year}/>
        </div>
        <div className={styles.field}>
            <p className="title">الشهر</p>
            <input type="number" onChange={(e)=>setMonth(e.target.value)} value={month}/>
        </div>
        <div className={styles.field}>
            <p className="title">العلبة</p>
            <input type='text' onChange={(e)=>setBox(e.target.value)} value={box}/>
        </div>
        <div className={styles.field}>
            <p className="title">اسم المشترك</p>
            <input type="text" onChange={(e)=>setName(e.target.value)} value={name}/>
        </div>
    </div>
  )
}

export default Filter