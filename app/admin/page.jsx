"use client";
import React, { useEffect, useState, useContext } from "react";
import styles from "./edit.module.scss";
import { editAdmin } from "../../functions";
import { UserContext } from "../../context/Usercontext";

const page = () => {
  const [rate, setRate] = useState(0);
  const [KWPrice, setKWPrice] = useState(0);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [ampsPrice, setAmpsPrice] = useState(0);
  const { admin } = useContext(UserContext);
  useEffect(() => {
    setKWPrice(admin?.KWPrice);
    setAmpsPrice(admin?.ampsPrice);
    setRate(admin?.rate);
    setUsername(admin?.username);
    setPassword(admin?.password);
  }, [admin]);

  return (
    <div className={styles.addContainer}>
      <div className={styles.up}>
        <div className={styles.field}>
          <p className="title">سعر الصرف</p>
          <input
            type="number"
            onChange={(e) => setRate(e.target.value)}
            value={rate}
          />
        </div>
        <div className={styles.field}>
          <p className="title">سعر الامبيراج</p>
          <input
            type="number"
            onChange={(e) => setAmpsPrice(e.target.value)}
            value={ampsPrice}
          />
        </div>

        <div className={styles.field}>
          <p className="title">kw سعر</p>
          <input
            type="float"
            onChange={(e) => setKWPrice(e.target.value)}
            value={KWPrice}
          />
        </div>
        <div className={styles.field}>
          <p className="title">الاسم</p>
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>
        <div className={styles.field}>
          <p className="title">كلمة السر</p>
          <input
            type="text"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
      </div>
      <div className={styles.down}>
        <div
          className={styles.btn}
          onClick={async () =>
            await editAdmin(rate, KWPrice, username, password, ampsPrice)
          }
        >
          حفظ
        </div>
      </div>
    </div>
  );
};

export default page;
