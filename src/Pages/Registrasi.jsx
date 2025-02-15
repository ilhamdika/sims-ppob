import React, { useState } from "react";
import { FaLock, FaEye, FaEyeSlash, FaAt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import IlustrasiLogin from "@/assets/images/Illustrasi Login.png";
import Logo from "@/assets/images/Logo.png";

const Registrasi = () => {
  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const urlApi = import.meta.env.VITE_API_URL + "registration";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Konfirmasi password tidak cocok");
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await fetch(urlApi, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          first_name: formData.first_name,
          last_name: formData.last_name,
          password: formData.password,
        }),
      });

      const result = await response.json();
      // console.log(result);

      if (result.status === 102) {
        setErrorMessage(result.message);
      } else {
        alert("Registrasi berhasil! Silakan login.");
        navigate("/login");
      }
    } catch (error) {
      setErrorMessage("Terjadi kesalahan, coba lagi.");
    } finally {
      setLoading(false);
    }
  };

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
          {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}

          <form onSubmit={handleSubmit}>
            <div className="relative mb-4">
              <FaAt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input type="email" name="email" className="w-full border-2 h-10 rounded-sm pl-10 pr-3" placeholder="Masukkan email anda" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="relative mb-4">
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input type="text" name="first_name" className="w-full border-2 h-10 rounded-sm pl-10 pr-3" placeholder="Masukkan nama depan" value={formData.first_name} onChange={handleChange} required />
            </div>
            <div className="relative mb-4">
              <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input type="text" name="last_name" className="w-full border-2 h-10 rounded-sm pl-10 pr-3" placeholder="Masukkan nama belakang" value={formData.last_name} onChange={handleChange} required />
            </div>
            <div className="relative mb-4">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input type={showPassword ? "text" : "password"} name="password" className="w-full border-2 h-10 rounded-sm pl-10 pr-10" placeholder="Masukkan password anda" value={formData.password} onChange={handleChange} required />
              <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <div className="relative mb-4">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type={showPasswordConfirm ? "text" : "password"}
                name="confirmPassword"
                className="w-full border-2 h-10 rounded-sm pl-10 pr-10"
                placeholder="Konfirmasi password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}>
                {showPasswordConfirm ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <button type="submit" className="w-full mt-4 h-10 rounded-sm text-white bg-red-500" disabled={loading}>
              {loading ? "Mendaftarkan..." : "Registrasi"}
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-700 dark:text-gray-300">
            Sudah punya akun? Login{" "}
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
