"use client";
import React, { useEffect, useState, useContext } from "react";
import { fetchAdmin, fetchLogin } from "../hooks/FirebaseHook";

const Fetch = () => {
  fetchLogin();
  fetchAdmin();
  return <></>;
};

export default Fetch;
