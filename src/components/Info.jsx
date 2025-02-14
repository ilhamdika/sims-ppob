import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProfilePhoto from "../assets/images/Profile Photo.PNG";
import { BsEye, BsEyeSlash } from "react-icons/bs";

export const Info = ({ namaUser, saldo }) => {
  const [showBalance, setShowBalance] = useState(false);
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      <div className="md:col-span-5 p-6 dark:bg-gray-700">
        <img src={ProfilePhoto} alt="Profile" className="w-auto h-auto rounded-full" />
        <p className="text-gray-800 dark:text-gray-300 text-xl">Selamat datang</p>
        <h3 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-200">{namaUser}</h3>
      </div>

      <div className="md:col-span-7 p-6 bg-red-600 dark:bg-gray-700 shadow-md rounded-lg flex flex-col justify-between">
        <p className="text-white dark:text-gray-300">Saldo anda</p>
        <h3 className="text-2xl font-bold mb-4 text-white dark:text-gray-200">{showBalance ? `Rp. ${saldo}` : "Rp. .........."}</h3>
        <button className="flex items-center text-white dark:text-gray-300 focus:outline-none" onClick={() => setShowBalance(!showBalance)}>
          {showBalance ? "Sembunyikan saldo" : "Lihat saldo"}
          {showBalance ? <BsEyeSlash className="ml-2" /> : <BsEye className="ml-2" />}
        </button>
      </div>
    </div>
  );
};

export default Info;
