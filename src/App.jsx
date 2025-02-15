import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux"; // Ambil state dari Redux
import LayoutPage from "./layout/LayoutPage";
import HomePage from "./Pages/Index";
import Topup from "./Pages/Topup";
import Transaction from "./Pages/Transaction";
import Akun from "./Pages/Akun";
import Pembayaran from "./Pages/Pembayaran";
import Login from "./Pages/Login";
import Registrasi from "./Pages/Registrasi";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/registrasi" element={<Registrasi />} />

      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <LayoutPage>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/topup" element={<Topup />} />
                <Route path="/transaction" element={<Transaction />} />
                <Route path="/akun" element={<Akun />} />
                <Route path="/pembayaran" element={<Pembayaran />} />
              </Routes>
            </LayoutPage>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
