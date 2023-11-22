"use client";
import React, { useContext, useEffect } from "react";
import { UserContext } from "../../context/Usercontext";
import { fetchUsers, fetchAdmin } from "../../hooks/FirebaseHook";
import Table from "../../components/Table/Table";
import Filter from "../../components/Filter/Filter";
import Action from "../../components/Action/Action";
const Page = () => {
  fetchUsers();
  fetchAdmin();
  const { fData } = useContext(UserContext);
  const headers = [
    "الدفعة الاخيرة",
    "الدين",
    "الفاتورة",
    "الامبيراج",
    "الاستهلاك",
    "العداد السابق",
    "العداد الحالي",
    "السنة",
    "الشهر",
    "رقم الهاتف",
    "العلبة",
    "اسم المشترك",
  ];
  return (
    <div>
      <Filter />
      <Table headers={headers} data={fData} />
      <Action />
    </div>
  );
};

export default Page;
