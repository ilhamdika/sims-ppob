import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Info from "../components/Info";
import { useDispatch, useSelector } from "react-redux";
import { setAmount } from "../redux/slices/topupSlice";
import { fetchSaldo } from "../redux/slices/saldoSlice";

export const Pembayaran = () => {
  const apiUrlServices = import.meta.env.VITE_API_URL + "services";
  const apiUrlTransaction = import.meta.env.VITE_API_URL + "transaction";
  const [service, setService] = useState(null);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const serviceCode = params.get("service_code")?.toUpperCase();
  const icon = params.get("i");
  const dispatch = useDispatch();

  const saldo = useSelector((state) => state.saldo.saldo);

  useEffect(() => {
    const fetchService = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Anda harus login terlebih dahulu.");
        return;
      }

      try {
        const response = await fetch(apiUrlServices, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await response.json();
        if (response.ok && result.status === 0) {
          const serviceData = result.data.find((s) => s.service_code === serviceCode);
          if (serviceData) {
            setService(serviceData);
          } else {
            console.error("Service tidak ditemukan");
          }
        } else {
          console.error("Gagal mendapatkan layanan:", result.message);
        }
      } catch (error) {
        console.error("Error fetching service:", error);
      }
    };

    if (serviceCode) {
      fetchService();
    }
  }, [serviceCode]);

  const handlePayment = async () => {
    if (!service) return;
    dispatch(setAmount(service.service_tariff));

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Anda harus login terlebih dahulu.");
      return;
    }

    try {
      const response = await fetch(apiUrlTransaction, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ service_code: service.service_code }),
      });

      const result = await response.json();
      if (response.ok && result.status === 0) {
        alert("Pembayaran berhasil!");
        dispatch(fetchSaldo());
      } else {
        alert("Pembayaran gagal: " + result.message);
      }
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };

  return (
    <div className="container mx-auto py-12">
      <Info />

      <div className="mt-2 p-6">
        <p className="text-gray-800 dark:text-gray-300 text-xl">Pembayaran</p>
        <div className="flex items-center gap-3">
          <img src={icon} alt="icon" className="w-12 h-12 self-center" />
          <h3 className="text-3xl font-bold text-gray-800 dark:text-gray-200 flex items-center">{service ? service.service_name : "Loading..."}</h3>
        </div>
        <input type="number" className="w-full border-2 h-10 rounded-sm px-3" value={service ? service.service_tariff : ""} placeholder="Masukkan nominal" readOnly />
        <button
          type="button"
          onClick={handlePayment}
          className={`w-full mt-4 h-10 rounded-sm text-white font-bold ${saldo < (service?.service_tariff || 0) ? "bg-gray-400 cursor-not-allowed" : "bg-red-500"}`}
          disabled={saldo < (service?.service_tariff || 0)}
        >
          {saldo < (service?.service_tariff || 0) ? "Saldo Tidak Cukup" : "Bayar"}
        </button>
      </div>
    </div>
  );
};

export default Pembayaran;
