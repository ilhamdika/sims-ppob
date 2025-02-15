import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import IlustrasiLogin from "../assets/images/Illustrasi Login.png";
import Logo from "../assets/images/logo.png";
import { FaLock, FaEye, FaEyeSlash, FaAt } from "react-icons/fa";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const urlApi = import.meta.env.VITE_API_URL + "login";

  const handleLogin = async () => {
    setErrorMessage("");

    try {
      const response = await fetch(urlApi, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.status === 0) {
        localStorage.setItem("token", data.data.token);
        navigate("/");
      } else {
        setErrorMessage(data.message || "Login gagal, periksa kembali data Anda.");
      }
    } catch (error) {
      setErrorMessage("Terjadi kesalahan, coba lagi nanti.");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 min-h-screen items-center">
      <div className="md:col-span-7 p-6 dark:bg-gray-700 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <img src={Logo} alt="icon" className="w-12 h-12" />
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">SIMS PPOB</h3>
          </div>
          <p className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">Masuk atau buat akun untuk memulai</p>
        </div>

        <div className="max-w-md mx-auto w-full">
          {errorMessage && <p className="text-red-500 text-sm mb-4 text-center">{errorMessage}</p>}
          <div className="relative mb-4">
            <FaAt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input type="text" name="email" className="w-full border-2 h-10 rounded-sm pl-10 pr-3" placeholder="Masukan email anda" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="relative mb-4">
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input type={showPassword ? "text" : "password"} name="password" className="w-full border-2 h-10 rounded-sm pl-10 pr-10" placeholder="Masukan password anda" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button type="button" className="w-full mt-4 h-10 rounded-sm text-white bg-red-500" onClick={handleLogin}>
            Login
          </button>
          <p className="mt-4 text-center text-sm text-gray-700 dark:text-gray-300">
            Belum punya akun? Registrasi{" "}
            <Link to="/registrasi" className="text-red-500">
              disini
            </Link>
          </p>
        </div>
      </div>
      <div className="md:col-span-5 rounded-lg flex items-center justify-center">
        <img src={IlustrasiLogin} className="h-auto max-w-full" alt="Illustrasi Login" />
      </div>
    </div>
  );
};

export default Login;
