import React, { useEffect, useState } from "react";
import { DotLoader } from "react-spinners";
import { Link } from "react-router-dom";
import Info from "../components/Info";
import PBB from "../assets/images/PBB.png";
import Listrik from "../assets/images/Listrik.png";
import Pulsa from "../assets/images/Pulsa.png";
import PDAM from "../assets/images/PDAM.png";
import PGN from "../assets/images/PGN.png";
import Televisi from "../assets/images/Televisi.png";
import Musik from "../assets/images/Musik.png";
import Game from "../assets/images/Game.png";
import Makanan from "../assets/images/Voucher Makanan.png";
import Kurban from "../assets/images/Kurban.png";
import Zakat from "../assets/images/Zakat.png";
import PaketData from "../assets/images/Paket Data.png";

const services = [
  { name: "PBB", icon: PBB },
  { name: "Listrik", icon: Listrik },
  { name: "Pulsa", icon: Pulsa },
  { name: "PDAM", icon: PDAM },
  { name: "PGN", icon: PGN },
  { name: "Televisi", icon: Televisi },
  { name: "Musik", icon: Musik },
  { name: "Game", icon: Game },
  { name: "Makanan", icon: Makanan },
  { name: "Kurban", icon: Kurban },
  { name: "Zakat", icon: Zakat },
  { name: "Paket Data", icon: PaketData },
];

export const Index = () => {
  const [loading, setLoading] = useState(true);
  const [showBalance, setShowBalance] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-500">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <DotLoader color="#10B981" size={60} />
        </div>
      ) : (
        <div className="container mx-auto py-12">
          <Info namaUser="Nama User COmponen" saldo="10.000.000" />

          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-4 mt-8">
            {services.map((service, index) => (
              <Link to="/" key={index} className="flex flex-col items-center dark:bg-gray-700 rounded-lg">
                <div key={index} className="flex flex-col items-center dark:bg-gray-700 rounded-lg">
                  <img src={service.icon} alt={service.name} className="w-16 h-16" />
                  <p className="text-center text-gray-800 dark:text-gray-300 text-sm mt-2">{service.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
