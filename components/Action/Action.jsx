import React, { useContext } from "react";
import styles from "./Action.module.scss";
import { UserContext } from "../../context/Usercontext";
import { toast } from "react-toastify";
import { deleteUser } from "../../functions";
import { signOut } from "next-auth/react";

const Action = () => {
  const { sUser } = useContext(UserContext);
  const edit = () => {
    if (sUser == "") {
      toast.warning("الرجاء تعين الاسم");
      return;
    } else {
      window.location.href = `/edit/${sUser}`;
    }
  };
  const invoice = () => {
    if (sUser == "") {
      toast.warning("الرجاء تعين الاسم");
      return;
    } else {
      window.location.href = `/invoice/${sUser}`;
    }
  };
  const view = () => {
    if (sUser == "") {
      toast.warning("الرجاء تعين الاسم");
      return;
    } else {
      window.location.href = `/view/${sUser}`;
    }
  };
  const deleteIt = () => {
    if (sUser == "") {
      toast.warning("الرجاء تعين الاسم");
      return;
    } else {
      deleteUser(sUser);
    }
  };
  return (
    <div className={styles.actionContainer}>
      <div onClick={() => deleteIt()} className={styles.action}>
        مسح
      </div>
      <div
        onClick={() => (window.location.href = "/add")}
        className={styles.action}
      >
        اضافة
      </div>
      <div onClick={() => edit()} className={styles.action}>
        تعديل
      </div>

      <div onClick={() => invoice()} className={styles.action}>
        انشاء فاتورة
      </div>
      <div onClick={() => view()} className={styles.action}>
        كشف
      </div>
      <div
        onClick={() => (window.location.href = "/admin")}
        className={styles.action}
      >
        ادارة
      </div>
      <div onClick={() => signOut()} className={styles.action}>
        خروج
      </div>
    </div>
  );
};

export default Action;
