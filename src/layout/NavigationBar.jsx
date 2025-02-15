import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Button from "../components/Button";
import { BsList } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import Logo from "@/assets/images/Logo.png";

export default function NavigationBar({ text, click }) {
  let Menu = [
    {
      name: "Top up",
      link: "topup",
    },
    {
      name: "Transaction",
      link: "transaction",
    },
    {
      name: "Akun",
      link: "akun",
    },
  ];
  let [open, setOpen] = useState(false);

  const closeMenu = () => {
    setOpen(false);
  };

  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <div className={`navbar ${visible ? "sm:block sm:relative" : "sm:hidden"}`}>
      <div className="shadow-md w-full fixed-absolute top-0 left-0 sm:fixed sm:bg-red-300 sm:dark:bg-gray-900 ">
        <div className="md:flex items-center justify-between py-4 md:px-10 px-7">
          <Link to="/" className="text-2xl cursor-pointer flex items-center dark:text-white">
            <img src={Logo} alt="Logo" className="w-10 h-10 mr-2" />
            <p className="font-bold">SIMS</p>
          </Link>
          <div onClick={() => setOpen(!open)} className="text-3xl absolute right-8 top-4 cursor-pointer md:hidden">
            {open ? <IoCloseSharp className="dark:text-white" /> : <BsList className="dark:text-white" />}
          </div>
          <ul className={`md:flex md:items-center md:pb-0 absolute md:static md:z-auto z-[-1] left-0 w-full md:w-auto sm:bg-red-300 dark:bg-gray-900 md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? "top-20 " : "top-[-490px]"}`}>
            {Menu.map((menu) => (
              <li key={menu.name} onClick={closeMenu} className="lg:ml-8 text-xl md:my-0 my-7">
                <NavLink to={menu.link} className={({ isActive }) => `dark:text-white hover:text-gray-400 duration-500 ml-5 mr-10 ${isActive ? "text-red-500 font-bold" : ""}`}>
                  {menu.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
