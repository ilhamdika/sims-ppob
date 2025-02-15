import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Info from "../components/Info";

const apiUrlServices = import.meta.env.VITE_API_URL + "services";
const apiUrlBanners = import.meta.env.VITE_API_URL + "banner";

export const Index = () => {
  const [services, setServices] = useState([]);
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Anda harus login terlebih dahulu.");
          return;
        }

        const headers = { Authorization: `Bearer ${token}` };

        const serviceResponse = await fetch(apiUrlServices, { headers });
        const serviceResult = await serviceResponse.json();
        if (serviceResponse.ok && serviceResult.status === 0) {
          setServices(serviceResult.data);
        }

        const bannerResponse = await fetch(apiUrlBanners, { headers });
        const bannerResult = await bannerResponse.json();
        if (bannerResponse.ok && bannerResult.status === 0) {
          setBanners(bannerResult.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto lg:py-12">
      <Info />

      {loading ? (
        <p className="text-center text-gray-500">Memuat data...</p>
      ) : (
        <>
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-4 mt-8">
            {services.map((service, index) => (
              <Link to={`/pembayaran?service_code=${service.service_code.toLowerCase()}&i=${encodeURIComponent(service.service_icon)}`} key={index} className="flex flex-col items-center dark:bg-gray-700 rounded-lg">
                <div className="flex flex-col items-center dark:bg-gray-700 rounded-lg">
                  <img src={service.service_icon} alt={service.service_name} className="w-16 h-16" />
                  <p className="text-center text-gray-800 dark:text-gray-300 text-sm mt-2">{service.service_name}</p>
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
                  <img src={banner.banner_image} alt={banner.banner_name} className="px-2 w-full" />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </>
      )}
    </div>
  );
};

export default Index;
