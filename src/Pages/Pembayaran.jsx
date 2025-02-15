import React from "react";
import { useLocation } from "react-router-dom";
import Info from "../components/Info";
import { FaTag } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setAmount } from "../redux/slices/topupSlice";

export const Pembayaran = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const serviceCode = params.get("service_code")?.toUpperCase();
  const icon = params.get("i");

  const dispatch = useDispatch();
  const amount = useSelector((state) => state.topup.amount);
  const isInvalid = amount && parseInt(amount, 10) < 10000;
  return (
    <div className="container mx-auto py-12">
      <Info namaUser="Nama User COmponen" saldo="10.000.000" />

      <div className="mt-2 p-6">
        <p className="text-gray-800 dark:text-gray-300 text-xl">Pembayaran</p>
        <div className="flex items-center gap-3">
          <img src={icon} alt="icon" className="w-12 h-12 self-center" />
          <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-200 flex items-center">{serviceCode}</h3>
        </div>
      </div>

      {isInvalid && <p className="text-red-500 text-sm mt-1">Minimal top up Rp10.000</p>}
      <input type="number" value={amount} onChange={(e) => dispatch(setAmount(e.target.value))} className={`w-full border-2 h-10 rounded-sm px-3 ${isInvalid ? "border-red-500" : "border-gray-300"}`} placeholder="Masukkan nominal" />
      <button type="submit" disabled={!amount} className={`w-full mt-4 h-10 rounded-sm text-white font-bold ${amount ? "bg-green-500 hover:bg-green-600" : "bg-gray-400 cursor-not-allowed"}`}>
        Top Up
      </button>
    </div>
  );
};

export default Pembayaran;
