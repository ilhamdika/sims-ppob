import React from "react";
import Info from "../components/Info";
import CardTransaction from "../components/CardTransaction";

export const Transaction = () => {
  return (
    <div className="container mx-auto py-12">
      <Info namaUser="Nama User COmponen" saldo="10.000.000" />

      <div className="mt-2 p-6">
        <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">Semua transaksi</h3>
        <CardTransaction nominal={50000} tanggal="14 Feb 2025" keterangan="Isi Saldo" tipe="topup" />
        <CardTransaction nominal={25000} tanggal="15 Feb 2025" keterangan="Pembayaran" tipe="pembayaran" />
      </div>
      <div className="flex justify-center mt-4">
        <button className="text-red-500 font-bold text-xl">Show more</button>
      </div>
    </div>
  );
};

export default Transaction;
