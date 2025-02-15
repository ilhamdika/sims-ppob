import React, { useState } from "react";
import IlustrasiLogin from "../assets/images/Illustrasi Login.png";
import Logo from "../assets/images/logo.png";
import { FaLock, FaEye, FaEyeSlash, FaAt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const Registrasi = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 min-h-screen items-center">
      <div className="md:col-span-7 p-6 dark:bg-gray-700 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <img src={Logo} alt="icon" className="w-12 h-12" />
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">SIMS PPOB</h3>
          </div>
          <p className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-6">Lengkapi data untuk membuat akun</p>
        </div>

        <div className="max-w-md mx-auto w-full">
          <div className="relative mb-4">
            <FaAt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input type="text" name="firstName" className="w-full border-2 h-10 rounded-sm pl-10 pr-3" placeholder="Masukan email anda" />
          </div>
          <div className="relative mb-4">
            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input type="text" name="firstName" className="w-full border-2 h-10 rounded-sm pl-10 pr-3" placeholder="Masukan nama depan" />
          </div>
          <div className="relative mb-4">
            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input type="text" name="firstName" className="w-full border-2 h-10 rounded-sm pl-10 pr-3" placeholder="Masukan nama belakang" />
          </div>
          <div className="relative mb-4">
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input type={showPassword ? "text" : "password"} name="password" className="w-full border-2 h-10 rounded-sm pl-10 pr-10" placeholder="Masukan password anda" />
            <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className="relative mb-4">
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input type={showPassword ? "text" : "password"} name="password" className="w-full border-2 h-10 rounded-sm pl-10 pr-10" placeholder="Konfirmasi password" />
            <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button type="button" className="w-full mt-4 h-10 rounded-sm text-white bg-red-500">
            Registrasi
          </button>
          <p className="mt-4 text-center text-sm text-gray-700 dark:text-gray-300">
            Sudah punya akun?Login{" "}
            <Link to="/login" className="text-red-500">
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

export default Registrasi;
