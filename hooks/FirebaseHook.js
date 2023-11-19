import { useEffect, useContext, useState } from "react";
import {
  collection,
  query,
  where,
  doc,
  onSnapshot,
  getDocs,
  getDoc,
} from "firebase/firestore";
import { db } from "../Firebase";
import { UserContext } from "../context/Usercontext";

export const fetchUsers = () => {
  const { setData, setFData } = useContext(UserContext);
  const usersRef = collection(db, "users");

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const usersQuery = query(usersRef, where("name", "!=", null));

        const unsubscribe = onSnapshot(usersQuery, (snapshot) => {
          if (!snapshot.empty) {
            const usersData = snapshot.docs.map((doc) => {
              const id = doc.id;
              const data = doc.data();
              return { id, ...data };
            });

            // Update the context with the fetched data
            setData([...usersData]);
            setFData([...usersData]);
          }
        });

        return () => {
          unsubscribe();
        };
      } catch (error) {
        console.log("Error fetching documents:", error);
      }
    };

    fetchDocuments();
  }, []);

  // No return statement or value is needed
};

export const fetchAdmin = () => {
  const { setAdmin } = useContext(UserContext);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const adminRef = collection(db, "admin");
        const adminDoc = doc(adminRef, "1");
        const querySnapshot = await getDoc(adminDoc);
        const data = { ...querySnapshot.data(), id: adminDoc.id };
        setAdmin(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDocuments();
  }, []);
};

export const fetchInvoices = async (id) => {
  const { setInvoices, setFInvoices } = useContext(UserContext);
  const invoicessRef = collection(db, "invoices");
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const invoicesQuery = query(invoicessRef, where("user", "==", id));

        const unsubscribe = onSnapshot(invoicesQuery, (snapshot) => {
          if (!snapshot.empty) {
            const invoicessData = snapshot.docs.map((doc) => {
              const id = doc.id;
              const data = doc.data();
              return { id, ...data };
            });

            // Update the context with the fetched data
            setInvoices([...invoicessData]);
            setFInvoices([...invoicessData]);
          }
        });

        return () => {
          unsubscribe();
        };
      } catch (error) {
        console.log("Error fetching documents:", error);
      }
    };

    fetchDocuments();
  }, []);
};
