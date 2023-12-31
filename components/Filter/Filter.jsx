import React from "react";
import styles from "./Filter.module.scss";
import { useState, useEffect, useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { UserContext } from "../../context/Usercontext";

const Filter = () => {
  const { data, setFData } = useContext(UserContext);
  const [box, setBox] = useState("");
  const [name, setName] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [number, setNumber] = useState("");
  const [filter, setFilter] = useState("كلا");
  const [date, setDate] = useState(null);

  useEffect(() => {
    const filtered = data.filter((user) => {
      const isNameMatch = user?.name.includes(name);
      const isBoxMatch = user?.box.includes(box);
      const isMonthMatch = month === "" || user?.month === month;
      const isYearMatch = year === "" || user?.year === year;
      const isNumberMatch = user?.number.includes(number);
      if (date == null) {
        return (
          isNameMatch &&
          isBoxMatch &&
          isMonthMatch &&
          isYearMatch &&
          isNumberMatch
        );
      } else if (filter === "التاريخ الحالي") {
        console.log(date);
        const userDate = user?.latestInvoice?.toDate();
        const inputDate = new Date(date.getTime());

        const isDateMatch =
          userDate instanceof Date &&
          userDate
            ?.toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })
            .toString() ===
            inputDate
              ?.toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })
              .toString();

        return (
          isNameMatch &&
          isBoxMatch &&
          isMonthMatch &&
          isYearMatch &&
          isNumberMatch &&
          isDateMatch
        );
      } else {
        // Assuming filter is not "التاريخ الحالي"
        const userDate = user?.latestInvoice?.toDate();
        const inputDate = new Date(date.getTime());
        return (
          isNameMatch &&
          isBoxMatch &&
          isMonthMatch &&
          isYearMatch &&
          isNumberMatch &&
          userDate instanceof Date &&
          (date == null ||
            userDate.getTime() <= inputDate.setDate(inputDate.getDate() + 1))
        );
      }
    });

    setFData(filtered);
  }, [box, month, year, number, date, name, filter, data]);

  const resetFields = () => {
    //reset all states
    setName("");
    setNumber("");
    setMonth("");
    setYear("");
    setBox("");
  };
  const filters = [
    {
      name: "التاريخ الحالي",
      action: () => {
        setFilter("التاريخ الحالي");
      },
    },
    {
      name: "قبل التاريخ",
      action: () => {
        setFilter("قبل التاريخ");
      },
    },
    {
      name: "لم يدفع",
      action: async () => {
        setFilter("لم يدفع");
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();

        const filtered = await data.filter(
          (user) =>
            !user?.latestInvoice instanceof Date ||
            user?.latestInvoice?.toDate().getMonth() + 1 != currentMonth ||
            user?.latestInvoice?.toDate().getFullYear() != currentYear
        );
        // .sort((a, b) => b.cur - b.prev - (a.cur - a.prev));
        setFData([...filtered]);
      },
    },
    {
      name: "تم الدفع",
      action: async () => {
        setFilter("تم الدفع");
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();

        const filtered = await data.filter(
          (user) =>
            user?.latestInvoice?.toDate().getMonth() + 1 == currentMonth &&
            user?.latestInvoice?.toDate().getFullYear() == currentYear
        );
        // .sort((a, b) => b.cur - b.prev - (a.cur - a.prev));
        setFData([...filtered]);
      },
    },
    {
      name: "دفع التأمين",
      action: async () => {
        setFilter("دفع التأمين");
        const filtered = await data
          .filter((user) => user?.balance > 0)
          .sort((a, b) => b.balance - a.balance);
        setFData([...filtered]);
      },
    },
    // {
    //   name: "التامين سلبي",
    //   action: async () => {
    //     setFilter("التامين سلبي");
    //     const filtered = await data
    //       .filter((user) => user?.balance < 0)
    //       .sort((a, b) => b.balance - a.balance);
    //     setFData([...filtered]);
    //   },
    // },
    {
      name: "لم يدفع تامين",
      action: async () => {
        setFilter("لم يدفع تامين");
        const filtered = await data
          .filter((user) => user?.balance == 0)
          .sort((a, b) => b.balance - a.balance);
        setFData([...filtered]);
      },
    },
    {
      name: "كلا",
      action: async () => {
        setFilter("كلا");
        setFData([...data]);
      },
    },
  ];
  return (
    <div className={styles.filterContainer}>
      <div className={styles.field}>
        <p className="title">الدفعة الاخيرة</p>
        <DatePicker
          selected={date}
          onChange={(e) => setDate(e)}
          dateFormat="dd/MM/yyyy"
          isClearable
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
      <div className={styles.field}>
        <p className="title">تعريب</p>
        <div className={styles.dropdown}>
          <input
            className={styles.dropdownInput}
            type="text"
            readOnly
            value={filter}
          />
          <div className={styles.dropdownContent}>
            {filters.map((filter) => (
              <div onClick={filter.action}>
                <div>{filter.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
