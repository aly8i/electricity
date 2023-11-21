import React, { useState } from "react";
import styles from "./Table.module.scss";
import { useContext } from "react";
import { UserContext } from "../../context/Usercontext";

const Table = ({ headers, data }) => {
  const { sUser, admin, setSUser } = useContext(UserContext);

  const selectRow = (id) => {
    if (id == sUser) {
      setSUser("");
    } else {
      setSUser(id);
    }
  };

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
          {data.map((user, i) => (
            <tr
              style={{ background: sUser == user?.id && "lightblue" }}
              onClick={() => selectRow(user?.id)}
              key={i}
            >
              <td>{user?.balance}</td>
              <td>
                {(
                  (user?.cur - user?.prev) * admin?.KWPrice +
                  user?.amps * admin?.ampsPrice
                ).toFixed(2)}{" "}
                $
              </td>
              <td>{user?.amps}</td>
              <td>{user?.cur - user?.prev}</td>
              <td>{user?.prev}</td>
              <td>{user?.cur}</td>
              <td>{user?.year}</td>
              <td>{user?.month}</td>
              <td>{user?.number}</td>
              <td>{user?.box}</td>
              <td>{user?.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
