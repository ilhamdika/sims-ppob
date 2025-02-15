import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
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
import Banner1 from "../assets/images/Banner 1.png";
import Banner2 from "../assets/images/Banner 2.png";
import Banner3 from "../assets/images/Banner 3.png";
import Banner4 from "../assets/images/Banner 4.png";
import Banner5 from "../assets/images/Banner 5.png";

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

const banners = [Banner1, Banner2, Banner3, Banner4, Banner5];

export const Index = () => {
  const [saldo, setSaldo] = useState(null);
  const [name, setName] = useState(null);
  const [profilePict, setProfilePict] = useState(null);
  const apiUrlBalance = import.meta.env.VITE_API_URL + "balance";
  const apiUrlProfile = import.meta.env.VITE_API_URL + "profile";

  return (
    <div className="container mx-auto lg:py-12">
      <Info />

      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-4 mt-8">
        {services.map((service, index) => (
          <Link to={`/pembayaran?service_code=${service.name.toLowerCase().replace(/\s+/g, "-")}&i=${encodeURIComponent(service.icon)}`} key={index} className="flex flex-col items-center dark:bg-gray-700 rounded-lg">
            <div className="flex flex-col items-center dark:bg-gray-700 rounded-lg">
              <img src={service.icon} alt={service.name} className="w-16 h-16" />
              <p className="text-center text-gray-800 dark:text-gray-300 text-sm mt-2">{service.name}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8">
        <Swiper
          spaceBetween={-5}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4.3 },
          }}
          loop
          className="w-full"
        >
          {banners.map((banner, index) => (
            <SwiperSlide key={index} className="flex flex-col items-center dark:bg-gray-700 rounded-lg">
              <img src={banner} alt={`Banner ${index + 1}`} className="px-2 w-full" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Index;
