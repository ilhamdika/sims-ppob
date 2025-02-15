import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSaldo, fetchProfile } from "../redux/slices/saldoSlice";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import ProfilePhoto from "../assets/images/Profile Photo.PNG";

export const Info = () => {
  const dispatch = useDispatch();
  const { saldo, name, profilePict, loading } = useSelector((state) => state.saldo);
  const [showBalance, setShowBalance] = useState(false);
  const [imageSrc, setImageSrc] = useState(profilePict || ProfilePhoto);

  useEffect(() => {
    dispatch(fetchSaldo());
    dispatch(fetchProfile());
  }, [dispatch]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      <div className="md:col-span-5 p-6 dark:bg-gray-700">
        <img src={imageSrc} alt="Profile" className="w-auto h-auto rounded-full" onError={() => setImageSrc(ProfilePhoto)} />
        <p className="text-gray-800 dark:text-gray-300 text-xl">Selamat datang</p>
        <h3 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-200">{name || "Loading..."}</h3>
      </div>

      <div className="md:col-span-7 p-6 bg-red-600 dark:bg-gray-700 shadow-md rounded-lg flex flex-col justify-between">
        <p className="text-white dark:text-gray-300">Saldo Anda</p>
        <h3 className="text-2xl font-bold mb-4 text-white dark:text-gray-200">{loading ? "Loading..." : showBalance ? `Rp. ${saldo}` : "Rp. .........."}</h3>
        <button className="flex items-center text-white dark:text-gray-300 focus:outline-none" onClick={() => setShowBalance(!showBalance)}>
          {showBalance ? "Sembunyikan saldo" : "Lihat saldo"}
          {showBalance ? <BsEyeSlash className="ml-2" /> : <BsEye className="ml-2" />}
        </button>
      </div>
    </div>
  );
};

export default Info;
