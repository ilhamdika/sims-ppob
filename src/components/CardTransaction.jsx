import React from "react";

export const CardTransaction = ({ nominal, tanggal, keterangan, tipe }) => {
  const isTopup = tipe === "topup";
  return (
    <div className="transaksi mt-2">
      <div className="border border-gray-300 p-4 rounded-md flex justify-between items-start">
        <div className="kiri py-1">
          <p className={`text-xl font-semibold ${isTopup ? "text-green-700" : "text-red-700"}`}>
            {isTopup ? "+" : "-"} {nominal.toLocaleString("id-ID")}
          </p>
          <p className="text-gray-700 font-light">{tanggal}</p>
        </div>
        <div className="kanan flex flex-col items-start">
          <p className="text-gray-700 font-semibold">{keterangan}</p>
        </div>
      </div>
    </div>
  );
};

export default CardTransaction;
