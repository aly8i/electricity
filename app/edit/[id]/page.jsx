"use client";
import React, { useEffect, useState } from "react";
import styles from "../edit.module.scss";
import { getUser, editUser } from "../../../functions";

const page = ({ params }) => {
  const [box, setBox] = useState("");
  const [name, setName] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [number, setNumber] = useState("");
  const [prev, setPrev] = useState("");
  const [cur, setCur] = useState("");
  const [amps, setAmps] = useState("");

  useEffect(() => {
    const effect = async () => {
      const user = await getUser(params.id);
      console.log(user);
      if (user == null) {
        window.location.href = "/dashboard";
      } else {
        setBox(user.box);
        setName(user.name);
        setMonth(user.month);
        setYear(user.year);
        setNumber(user.number);
        setPrev(user.prev);
        setCur(user.cur);
        setAmps(user.amps);
      }
    };
    effect();
  }, []);

  return (
    <div className={styles.addContainer}>
      <div className={styles.up}>
        <div className={styles.field}>
          <p className="title">رقم الهاتف</p>
          <input
            type="number"
            onChange={(e) => setNumber(e.target.value)}
            value={number}
          />
        </div>
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
          <p className="title">العداد السابق</p>
          <input
            type="text"
            onChange={(e) => setPrev(e.target.value)}
            value={prev}
          />
        </div>
        <div className={styles.field}>
          <p className="title">العداد الحالي</p>
          <input
            type="text"
            onChange={(e) => setCur(e.target.value)}
            value={cur}
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
            await editUser(
              params.id,
              name,
              box,
              prev,
              cur,
              month,
              year,
              number,
              amps
            )
          }
        >
          تعديل
        </div>
      </div>
    </div>
  );
};

export default page;
