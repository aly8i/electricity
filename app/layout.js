"use client";
import { UserContextProvider } from "../context/Usercontext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Fetch from "../components/fetch";
import { SessionProvider } from "next-auth/react";
export default function RootLayout({ children }) {
  return (
    <html>
      <head />
      <SessionProvider>
        <UserContextProvider>
          <body>
            {children}
            <ToastContainer position="bottom-right" autoClose={3000} />
            <Fetch />
          </body>
        </UserContextProvider>
      </SessionProvider>
    </html>
  );
}
