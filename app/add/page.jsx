"use client";
import React from "react";
import { useState, useEffect, useContext, useRef } from "react";
import styles from "./add.module.scss";
import { addUser } from "../../functions";

const add = () => {
  const [box, setBox] = useState("");
  const [name, setName] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [number, setNumber] = useState("");
  const [prev, setPrev] = useState("");
  const printRef = useRef();
  const [amps, setAmps] = useState("");

  return (
    <div className={styles.addContainer} ref={printRef}>
      <div className={styles.up}>
        <div className={styles.field}>
          <p className="title">السنة</p>
          <input
            type="number"
            onChange={(e) => setYear(e.target.value)}
            value={year}
          />
        </div>
        <div className={styles.field}>
          <p className="title">الشهر</p>
          <input
            type="number"
            onChange={(e) => setMonth(e.target.value)}
            value={month}
          />
        </div>
        <div className={styles.field}>
          <p className="title">الامبيراج</p>
          <input
            type="number"
            onChange={(e) => setAmps(e.target.value)}
            value={amps}
          />
        </div>
        <div className={styles.field}>
          <p className="title">العداد</p>
          <input
            type="text"
            onChange={(e) => setPrev(e.target.value)}
            value={prev}
          />
        </div>
        <div className={styles.field}>
          <p className="title">رقم الهاتف</p>
          <input
            type="number"
            onChange={(e) => setNumber(e.target.value)}
            value={number}
          />
        </div>
        <div className={styles.field}>
          <p className="title">العلبة</p>
          <input
            type="text"
            onChange={(e) => setBox(e.target.value)}
            value={box}
          />
        </div>
        <div className={styles.field}>
          <p className="title">اسم المشترك</p>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
      </div>
      <div className={styles.down}>
        <div
          className={styles.btn}
          onClick={async () =>
            await addUser(name, box, prev, month, year, number, amps)
          }
        >
          انشاء
        </div>
      </div>
    </div>
  );
};

export default add;
