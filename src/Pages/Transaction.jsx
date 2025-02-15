import React, { useEffect, useState, useRef } from "react";
import Info from "../components/Info";
import CardTransaction from "../components/CardTransaction";

export const Transaction = () => {
  const apiUrl = import.meta.env.VITE_API_URL + "transaction/history";
  const [transactions, setTransactions] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(3);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    fetchTransactions(offset);
  }, [offset]);

  const fetchTransactions = async (currentOffset) => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Anda harus login terlebih dahulu.");
        setLoading(false);
        return;
      }

      const response = await fetch(`${apiUrl}?offset=${currentOffset}&limit=${limit}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (response.ok && result.status === 0) {
        const newTransactions = result.data.records;

        setTransactions((prev) => {
          const uniqueTransactions = newTransactions.filter((newTrx) => !prev.some((prevTrx) => prevTrx.invoice_number === newTrx.invoice_number));

          return [...prev, ...uniqueTransactions];
        });

        setHasMore(newTransactions.length === limit);
      } else {
        console.error("Gagal mendapatkan transaksi:", result.message);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleShowMore = () => {
    setOffset((prevOffset) => prevOffset + limit);
  };

  return (
    <div className="container mx-auto py-12">
      <Info />

      <div className="mt-2 p-6">
        <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">Semua Transaksi</h3>

        {transactions.length > 0 ? (
          transactions.map((trx, index) => (
            <CardTransaction key={trx.invoice_number} nominal={trx.total_amount} tanggal={new Date(trx.created_on).toLocaleDateString("id-ID")} keterangan={trx.description} tipe={trx.transaction_type.toLowerCase()} />
          ))
        ) : (
          <p className="text-gray-500">Belum ada transaksi.</p>
        )}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-4">
          <button onClick={handleShowMore} disabled={loading} className="text-red-500 font-bold text-xl disabled:text-gray-400">
            {loading ? "Memuat..." : "Show more"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Transaction;
