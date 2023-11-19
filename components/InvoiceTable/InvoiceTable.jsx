"use client";
import React, { useState } from "react";
import styles from "./InvoiceTable.module.scss";
import { useContext } from "react";
import { UserContext } from "../../context/Usercontext";
const InvoiceTable = ({ headers }) => {
  const { admin, fInvoices } = useContext(UserContext);

  return (
    <div className={styles.tablecontainer}>
      <table className={styles.styledtable}>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {fInvoices?.map((inv, i) => (
            <tr key={i}>
              <td>{inv?.date?.toDate().toLocaleDateString("en-GB")}</td>
              <td>{inv?.amount}</td>
              <td>
                {(
                  (inv?.cur - inv?.prev) * admin?.KWPrice +
                  inv?.amps * admin?.ampsPrice
                ).toFixed(2)}
              </td>
              <td>{inv?.cur - inv?.prev}</td>
              <td>{inv?.year}</td>
              <td>{inv?.month}</td>
              <td>{inv?.id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceTable;
