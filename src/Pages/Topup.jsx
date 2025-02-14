import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAmount } from "../redux/slices/topupSlice";
import Info from "../components/Info";

export const Topup = () => {
  const dispatch = useDispatch();
  const amount = useSelector((state) => state.topup.amount);

  const presetAmounts = [50000, 100000, 200000, 500000, 1000000];
  const isInvalid = amount && parseInt(amount, 10) < 10000;

  return (
    <div className="container mx-auto py-12">
      <Info namaUser="Nama User COmponen" saldo="10.000.000" />

      <div className="mt-2 p-6">
        <p className="text-gray-800 dark:text-gray-300 text-xl">Silahkan masukan</p>
        <h3 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-200">Nominal Top Up</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-7 p-6 dark:bg-gray-700">
          <input type="number" value={amount} onChange={(e) => dispatch(setAmount(e.target.value))} className={`w-full border-2 h-10 rounded-sm px-3 ${isInvalid ? "border-red-500" : "border-gray-300"}`} placeholder="Masukkan nominal" />
          {isInvalid && <p className="text-red-500 text-sm mt-1">Minimal top up Rp10.000</p>}
          <button type="submit" disabled={!amount} className={`w-full mt-4 h-10 rounded-sm text-white font-bold ${amount ? "bg-green-500 hover:bg-green-600" : "bg-gray-400 cursor-not-allowed"}`}>
            Top Up
          </button>
        </div>
        <div className="md:col-span-5 p-6 dark:bg-gray-700 flex flex-col justify-between">
          <div className="grid grid-cols-3 gap-4">
            {presetAmounts.map((value, index) => (
              <button key={index} className="border-2 py-2 rounded-md transition hover:bg-gray-200" onClick={() => dispatch(setAmount(value))}>
                {value.toLocaleString("id-ID")}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topup;
