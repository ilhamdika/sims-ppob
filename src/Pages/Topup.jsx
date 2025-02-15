import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAmount } from "../redux/slices/topupSlice";
import { fetchSaldo } from "../redux/slices/saldoSlice";
import Info from "../components/Info";
import SuccessPopup from "../components/SuccessPopup";

export const Topup = () => {
  const dispatch = useDispatch();
  const amount = useSelector((state) => state.topup.amount);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const presetAmounts = [50000, 100000, 200000, 500000, 1000000];
  const isInvalid = !amount || parseInt(amount, 10) < 10000;
  const apiUrlTopup = import.meta.env.VITE_API_URL + "topup";

  const handleTopup = async () => {
    setLoading(true);
    setSuccessMessage("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setSuccessMessage("Anda harus login terlebih dahulu.");
        setLoading(false);
        return;
      }

      const response = await fetch(apiUrlTopup, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ top_up_amount: parseInt(amount, 10) }),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccessMessage("Top-up berhasil! Saldo telah diperbarui.");
        dispatch(fetchSaldo());
      } else {
        setSuccessMessage(result.message || "Terjadi kesalahan, coba lagi.");
      }
    } catch (error) {
      setSuccessMessage("Gagal melakukan top-up. Periksa koneksi Anda.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-12">
      <Info />

      <div className="mt-2 p-6">
        <p className="text-gray-800 dark:text-gray-300 text-xl">Silahkan masukkan</p>
        <h3 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-200">Nominal Top Up</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-7 p-6 dark:bg-gray-700">
          {isInvalid && <p className="text-red-500 text-sm mt-1">Minimal top up Rp10.000</p>}

          <input
            type="number"
            value={amount}
            onChange={(e) => dispatch(setAmount(e.target.value))}
            className={`w-full border-2 h-10 rounded-sm px-3 ${isInvalid ? "border-red-500" : "border-gray-300"}`}
            placeholder="Masukkan nominal"
            disabled={loading}
          />

          <button type="button" disabled={isInvalid || loading} onClick={handleTopup} className={`w-full mt-4 h-10 rounded-sm text-white font-bold ${isInvalid || loading ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"}`}>
            {loading ? "Memproses..." : "Top Up"}
          </button>
        </div>

        <div className="md:col-span-5 p-6 dark:bg-gray-700 flex flex-col justify-between">
          <div className="grid grid-cols-3 gap-4">
            {presetAmounts.map((value, index) => (
              <button key={index} className="border-2 py-2 rounded-md transition hover:bg-gray-200" onClick={() => dispatch(setAmount(value))} disabled={loading}>
                {value.toLocaleString("id-ID")}
              </button>
            ))}
          </div>
        </div>
      </div>

      <SuccessPopup message={successMessage} onClose={() => setSuccessMessage("")} />
    </div>
  );
};

export default Topup;
