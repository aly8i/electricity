"use client"
import { UserContextProvider } from "../context/Usercontext";
import { ToastContainer } from "react-toastify";
export default function RootLayout({ children }) {
  return (
    <html>
      <head />
      <UserContextProvider>

      <body>{children}</body>
      </UserContextProvider>
    </html>
  )
}
