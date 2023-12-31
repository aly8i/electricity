"use client";
import React, { useEffect, useState, useRef, useContext } from "react";
import styles from "../invoice.module.css";
import { getUser, saveInvoice2 } from "../../../functions";
import ReactToPrint from "react-to-print";
import { UserContext } from "../../../context/Usercontext";
import { v4 as uuidv4 } from "uuid";

const Page = ({ params }) => {
  const [box, setBox] = useState("");
  const [amps, setAmps] = useState(0);
  const [name, setName] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [number, setNumber] = useState("");
  const [prev, setPrev] = useState("");
  const [id, setID] = useState("");
  const [cur, setCur] = useState("");
  const [balance, setBalance] = useState("");

  const [date, setDate] = useState("");
  const { admin } = useContext(UserContext);
  const [amount, setAmount] = useState(0);
  const printRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getUser(params.id);
        if (user == null) {
          window.location.href = "/dashboard";
        } else {
          const newID = uuidv4().replace(/-/g, "").slice(0, 20);
          setID(newID);
          setBox(user.box);
          setName(user.name);
          setMonth(user.month);
          setYear(user.year);
          setNumber(user.number);
          setPrev(user.prev);
          setCur(user.cur);
          setAmps(user.amps);
          setBalance(user.balance);
          console.log(user.balance);
          const yourDate = new Date();
          const day = String(yourDate.getDate()).padStart(2, "0");
          const month = String(yourDate.getMonth() + 1).padStart(2, "0");
          const year = yourDate.getFullYear();
          const formatted = `${day}/${month}/${year}`;
          setDate(formatted);

          if (admin) {
            const x1 = user?.cur - user?.prev;
            const x2 = x1 * admin?.KWPrice;
            const x3 = x2 + user?.amps * admin?.ampsPrice;
            setAmount(x3.toFixed(2));
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [params.id, admin]);

  return (
    <div className={styles.addContainer}>
      <div className={styles.up} ref={printRef}>
        <div className={styles.mtitle}>ايصال تأمين كهرباء</div>
        <div className={styles.left}>
          <div className={styles.info}>
            <div className={styles.detail}>
              {/* <p>{box}</p> */}
              <p>&nbsp;</p>
              {/* <p>: العلبة</p> */}
            </div>
          </div>
          <div className={styles.info}>{id} : الرمز</div>

          <div className={styles.info}>
            {/* {amps}A : الامبيراج */}
            <p>&nbsp;</p>
          </div>
        </div>
        <div className={styles.line} />
        <div className={styles.body}>
          <table className={styles.table}>
            {/* <thead>
              <tr className={styles.tr}>
                <th className={styles.th}>الاستهلاك</th>
                <th className={styles.th}>العداد السابق</th>
                <th className={styles.th}>العداد الحالي</th>
              </tr>
            </thead>
            <tbody>
              <tr className={styles.tr}>
                <td className={styles.td}>{cur - prev}</td>
                <td className={styles.td}>{prev}</td>
                <td className={styles.td}>{cur}</td>
              </tr>
            </tbody> */}
          </table>
          <div className={styles.from}>
            <div className={styles.detail}>
              <p>{name}</p>
              <p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</p>
              <p>{": (ة)وصلني من السيد"} </p>
            </div>
          </div>
        </div>
        <div className={styles.details}>
          <div className={styles.detail}>
            {/* <p>{`دولار`}</p>
            <p>&nbsp;</p>
            <p>{((cur - prev) * admin?.KWPrice).toFixed(2)}</p>
            <p>&nbsp;</p>
            <p>{"ليرة لبنانية او"}</p>
            <p>&nbsp;</p>
            <p>
              {((cur - prev) * admin?.KWPrice * admin?.rate).toLocaleString()}
            </p>
            <p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</p>
            <p>{": مجموع الاستهلاك"} </p> */}
          </div>
          <div className={styles.detail}>
            <p>{"دولار"}</p>
            <p>&nbsp;</p>
            <p>{amount}</p>
            <p>&nbsp;</p>
            <p>{"ليرة لبنانية او"}</p>
            <p>&nbsp;</p>
            <p>{(amount * admin?.rate).toLocaleString()}</p>
            <p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</p>
            <p>{": مبلغ و قدره"}</p>
          </div>
        </div>
        <div className={styles.details}>
          <div className={styles.detail}>
            {/* <p>{"دولار"}</p>
            <p>&nbsp;</p>
            <p>{(amps * admin?.ampsPrice).toFixed(2)}</p>
            <p>&nbsp;</p>
            <p>{"ليرة لبنانية او"}</p>
            <p> &nbsp;</p>
            <p>{(amps * admin?.ampsPrice * admin?.rate).toLocaleString()}</p>
            <p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</p>
            <p>{": الاشتراك الثابت"}</p> */}
          </div>
          <div className={styles.detail}>
            <p>{year}</p>
            <p>&nbsp;</p>
            <p>{"/"} </p>
            <p>&nbsp;</p>
            <p>{month}</p>
            <p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</p>
            <p>{": وذالك خلال شهر"}</p>
          </div>
        </div>
        <div className={styles.details}>
          <div className={styles.detailxx}>
            <div className={styles.detailx}>
              <div className={styles.detail1}>
                {/* <p>{"ليرة لبنانية"}</p>
                <p>&nbsp;</p>
                <p>{(admin?.KWPrice * admin?.rate)?.toLocaleString()}</p>
                */}
                <p>{"الى المنازل"}</p>
                <p>&nbsp;</p>
                <p>{"الكهرباء"}</p>
                <p>&nbsp;</p>
                <p> {"هذه الدفعة هي مبلغ تأمين تمديد"}</p>
              </div>
              <div className={styles.detail2}>
                {/* <p>{admin?.rate?.toLocaleString()}</p>
                <p>&nbsp;</p>
                <p>{}</p>
                <p>&nbsp;</p> */}
                <p>{"لخدمتكم بشكل افضل"}</p>
                <p>&nbsp;</p>
                <p>{"و المحلات التجارية"}</p>
                <p>&nbsp;</p>
              </div>
            </div>
            {/* <p>{"دولار"}</p>
            <p>&nbsp;</p>
            <p>
              {(
                (cur - prev) * admin?.KWPrice +
                amps * admin?.ampsPrice
              ).toFixed(2)}
            </p>
            <p>&nbsp;</p>
            <p>{"ليرة لبنانية او"} </p>
            <p>&nbsp;</p>
            <p>
              {(
                ((cur - prev) * admin?.KWPrice + amps * admin?.ampsPrice) *
                admin?.rate
              ).toLocaleString()}
            </p>
            <p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</p>
            <p>{": مجموع الفاتورة"}</p> */}
          </div>
          <div className={styles.detailx}>
            <div className={styles.detail1}>
              <p>{"ليرة لبنانية"}</p>
              <p>&nbsp;</p>
              <p>{(admin?.KWPrice * admin?.rate)?.toLocaleString()}</p>
              <p>&nbsp;</p>
              <p>{"سعر الكيلو واط الصادر عن وزارة الطاقة"}</p>
            </div>
            <div className={styles.detail2}>
              <p>{admin?.rate?.toLocaleString()}</p>
              <p>&nbsp;</p>
              <p>{"دولار على سعر الصيرفة"}</p>
              <p>&nbsp;</p>
              <p>{admin?.KWPrice}</p>
              <p>&nbsp;</p>
              <p>{"او"}</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.middle}>
        <div className={styles.field}>
          <p className="title">قيمة الدفع</p>
          <input
            type="number"
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
          />
        </div>
      </div>
      <div className={styles.down}>
        <ReactToPrint
          trigger={() => <button className={styles.btn}>طبع</button>}
          content={() => printRef.current}
          pageStyle={`@media print {
            .${styles.mtitle} {
              position: relative;
              right: -100px;
            }
          }`}
        />
        <button
          onClick={() =>
            saveInvoice2(
              id,
              params.id,
              name,
              box,
              prev,
              cur,
              month,
              year,
              number,
              parseFloat(amount),
              date,
              amps
            )
          }
          className={styles.btn}
        >
          حفظ
        </button>
      </div>
    </div>
  );
};

export default Page;
