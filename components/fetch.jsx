"use client"
import React, { useEffect,useState,useContext } from 'react'
import { fetchAdmin } from '../hooks/FirebaseHook';

const Fetch = () => {
    fetchAdmin();
  return (
    <></>
  )
}

export default Fetch