import React from "react";
import { Route, Routes } from "react-router-dom";
import LayoutPage from "./layout/LayoutPage";
import HomePage from "./Pages/Index";
import Topup from "./Pages/Topup";
import Transaction from "./Pages/Transaction";
import Akun from "./Pages/Akun";
import AOS from "aos";
import { useEffect } from "react";

const app = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <LayoutPage>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/topup" element={<Topup />} />
        <Route path="/transaction" element={<Transaction />} />
        <Route path="/akun" element={<Akun />} />
      </Routes>
    </LayoutPage>
  );
};

export default app;
