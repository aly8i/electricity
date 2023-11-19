"use client";
import React, { useEffect, useState } from "react";
import InvoiceFilter from "../../../components/InvoiceFilter/InvoiceFilter";
import InvoiceTable from "../../../components/InvoiceTable/InvoiceTable";
import { getUser } from "../../../functions";
import { fetchInvoices } from "../../../hooks/FirebaseHook";
import Top from "../../../components/Top/Top";

const Page = ({ params }) => {
  const [name, setName] = useState("");

  const headers = [
    "تاريخ الدفع",
    "قيمة الدفع",
    "الفاتورة",
    "الاستهلاك",
    "السنة",
    "الشهر",
    "الرمز",
  ];
  fetchInvoices(params?.id);
  useEffect(() => {
    const effect = async () => {
      const res = await getUser(params?.id);
      setName(res?.name);
    };
    effect();
  });
  return (
    <div>
      <Top name={name} />
      <InvoiceFilter />
      <InvoiceTable headers={headers} />
    </div>
  );
};

export default Page;
