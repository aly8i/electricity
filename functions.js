import { db } from "./Firebase";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  getDocs,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { toast } from "react-toastify";

export const getUser = async (id) => {
  try {
    const usersRef = collection(db, "users");
    const userDoc = doc(usersRef, id);
    const querySnapshot = await getDoc(userDoc);
    if (querySnapshot.empty) {
      toast.warning("الاسم غير موجود");
      return null;
    } else {
      const userData = { ...querySnapshot.data(), id: userDoc.id };
      return userData;
    }
  } catch (error) {
    toast.error("Error getting the user");
  }
};

export const addUser = async (name, box, prev, month, year, number, amps) => {
  if (
    name == "" ||
    box == "" ||
    prev == "" ||
    month == "" ||
    year == "" ||
    number == "" ||
    amps == ""
  ) {
    toast.warning("الرجاء ادخال جميع المعلومات");
    return;
  }
  try {
    const usersRef = collection(db, "users");
    const usersQuery = query(usersRef, where("name", "==", name));
    const querySnapshot = await getDocs(usersQuery);
    if (!querySnapshot.empty) {
      toast.warning("الاسم موجود");
    } else {
      const data = {
        name,
        box,
        cur: parseFloat(prev),
        prev: parseFloat(prev),
        month: parseInt(month),
        year: parseInt(year),
        number,
        amps,
        balance: 0,
      };
      await addDoc(usersRef, data);
      window.location.href = "/dashboard";
    }
    toast.success("User added succefully");
  } catch (error) {
    toast.error("Error adding the user");
  }
};

export const editUser = async (
  id,
  name,
  box,
  prev,
  cur,
  month,
  year,
  number,
  amps,
  balance
) => {
  try {
    if (
      !id ||
      name === "" ||
      box === "" ||
      prev === "" ||
      cur === "" ||
      month === "" ||
      year === "" ||
      number === ""
    ) {
      toast.warning("الرجاء ادخال جميع المعلومات");
      return;
    }

    const usersRef = collection(db, "users");
    if (id) {
      const userDoc = doc(usersRef, id);
      const data = {
        name,
        box,
        cur: parseFloat(cur),
        prev: parseFloat(prev),
        month: parseInt(month),
        year: parseInt(year),
        number,
        amps,
        balance,
      };
      await updateDoc(userDoc, data);
    }

    window.location.href = "/dashboard";
    toast.success("الاسم تغير");
  } catch (error) {
    toast.error("عطل حصل");
    console.error("Error:", error);
  }
};

export const editAdmin = async (
  rate,
  KWPrice,
  username,
  password,
  ampsPrice
) => {
  try {
    if (
      rate === 0 ||
      KWPrice === 0 ||
      username === "" ||
      password === "" ||
      ampsPrice === 0
    ) {
      toast.warning("الرجاء ادخال جميع المعلومات");
      return;
    }

    const adminRef = collection(db, "admin");
    const adminDoc = doc(adminRef, "1");
    const data = {
      rate,
      KWPrice,
      username,
      password,
      ampsPrice,
    };
    await updateDoc(adminDoc, data);

    window.location.href = "/dashboard";
    toast.success("حفظة المعلومات");
  } catch (error) {
    toast.error("عطل حصل");
    console.error("Error:", error);
  }
};

export const saveInvoice = async (
  id,
  name,
  box,
  prev,
  cur,
  month,
  year,
  number,
  amount,
  date,
  amps
) => {
  try {
    const nowdate = new Date();
    if (
      !id ||
      name === "" ||
      box === "" ||
      prev === "" ||
      cur === "" ||
      month === "" ||
      year === "" ||
      number === "" ||
      date === null ||
      amps === ""
    ) {
      toast.warning("المعلومات غير مكتملة");
      return;
    }

    const invoicessRef = collection(db, "invoices");
    const usersRef = collection(db, "users");
    if (id) {
      const data = {
        user: id,
        name,
        box,
        cur: parseFloat(cur),
        prev: parseFloat(prev),
        month: parseInt(month),
        year: parseInt(year),
        number,
        amount,
        date: nowdate,
        amps: parseInt(amps),
      };
      await addDoc(invoicessRef, data);

      const data2 = { prev: cur };
      if (id) {
        const userDoc = doc(usersRef, id);
        await updateDoc(userDoc, data2);
      }
    }
    toast.success("الفاتورة حفظة");
  } catch (error) {
    toast.error("عطل حصل");
    console.error("Error:", error);
  }
};

export const getInvoices = async (id) => {
  try {
    if (!id) {
      toast.warning("حدث خطء");
      return;
    }

    const invoicessRef = collection(db, "invoices");
    const invoicesQuery = query(invoicessRef, where("user", "==", id));
    const querySnapshot = await getDocs(invoicesQuery);
    if (querySnapshot.empty) {
      toast.warning("لا يوجد فواتير");
    } else {
      const invoicesData = querySnapshot.docs.map((doc) => {
        doc.data(), doc.id;
      });
      return invoicesData;
    }
  } catch (error) {
    toast.error("عطل حصل");
    console.error("Error:", error);
  }
};
