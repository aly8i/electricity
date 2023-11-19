"use client"
import React from 'react'
import styles from './InvoiceFilter.module.scss'
import { useState,useEffect,useContext } from 'react'
import 'react-datepicker/dist/react-datepicker.css';
import { UserContext } from '../../context/Usercontext';
import DatePicker from 'react-datepicker';

const InvoiceFilter = () => {
    const [id,setID] = useState("");
    const [month,setMonth] = useState("");
    const [year,setYear] = useState("");
    const [date,setDate] = useState(null);
    const {invoices,setFInvoices} = useContext(UserContext)

    useEffect(()=>{
        const filtered = invoices.filter((inv)=>inv?.id.toLowerCase().includes(id)&&(month==""||inv?.month==month)&&(year==""||inv?.year==year)&&(date==null||inv?.date.toDate().toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          }).toString()==date?.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          }).toString()))
        setFInvoices(filtered);
    },[month,year,date,id])

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
            <p className="title">السنة</p>
            <input type="number" onChange={(e)=>setYear(e.target.value)} value={year}/>
        </div>
        <div className={styles.field}>
            <p className="title">الشهر</p>
            <input type="number" onChange={(e)=>setMonth(e.target.value)} value={month}/>
        </div>
        <div className={styles.field}>
            <p className="title">الرمز</p>
            <input type="text" onChange={(e)=>setID(e.target.value)} value={id}/>
        </div>
    </div>
  )
}

export default InvoiceFilter