"use client";
import React, { useEffect, useState, useContext } from "react";
import styles from "./edit.module.scss";
import { editAdmin, getTodayTotal, getMonthsTotal } from "../../functions";
import { UserContext } from "../../context/Usercontext";
import Chart from "../../components/Chart/Chart";
const page = () => {
  const [rate, setRate] = useState(0);
  const [KWPrice, setKWPrice] = useState(0);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [ampsPrice, setAmpsPrice] = useState(0);
  const [today, setToday] = useState(0);
  const [months, setMonths] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const { admin } = useContext(UserContext);

  useEffect(() => {
    const fetch = async () => {
      const y = await getTodayTotal();
      const yy = await getMonthsTotal();
      setMonths(yy);
      setToday(y);
    };
    fetch();
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
      <div className={styles.middle}>
        <div className={styles.today}>
          <p className={styles.today1}>مجموع اليوم</p>
          <p className={styles.today2}>{today}$</p>
        </div>
        <div className={styles.months}>
          <Chart aspect={3} title={"months"} months={months} />
        </div>
      </div>
      <div className={styles.down}>
        <div
          className={styles.btn}
          onClick={async () =>
            await editAdmin(
              parseFloat(rate),
              parseFloat(KWPrice),
              username,
              password,
              parseFloat(ampsPrice)
            )
          }
        >
          حفظ
        </div>
      </div>
    </div>
  );
};

export default page;
