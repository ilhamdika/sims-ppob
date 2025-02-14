import NavigationBar from "./NavigationBar";
import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import moment from "moment-timezone";
import InfoBottom from "./InfoBottom";

export default function LayoutPage({ children }) {
  const [dark, setDark] = useState(true);

  const toggleTheme = () => {
    setDark(!dark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <>
      <div className="dark:bg-dark">
        <div className="sm:mx-2">
          {/* Navbar */}
          <div className="sm:fixed top-0 left-0 w-full z-50">
            <NavigationBar text={dark ? <FiMoon /> : <FiSun />} click={toggleTheme} />
          </div>

          {/* Konten */}
          <div className="sm:pt-20 min-h-screen">
            <main className="dark:bg-dark">{children}</main>
          </div>
        </div>
        <footer className="bg-gray-800 text-white py-6 text-center">
          <p>&copy; 2024 Ilham Dika. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}
