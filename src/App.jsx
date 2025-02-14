import React from "react";
import { Route, Routes } from "react-router-dom";
import LayoutPage from "./layout/LayoutPage";
import HomePage from "./Pages/Index";
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
      </Routes>
    </LayoutPage>
  );
};

export default app;
