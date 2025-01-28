import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="bg-white border-b w-full sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <div
          className="text-2xl font-bold text-black tecursor-pointer"
          onClick={() => navigate("/")}
        >
          Apay     </div>

        {/* Hamburger Menu for Mobile */}
        <button
          className="md:hidden text-gray-800"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Navigation Links */}
        <ul
          className={`${
            isOpen ? "block" : "hidden"
          } md:flex md:items-center md:space-x-6 mt-4 md:mt-0 text-gray-700`}
        >
          <li
            className="hover:text-blue-500 transition cursor-pointer"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </li>
          <li
            className="hover:text-blue-500 transition cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </li>
          <li
            className="hover:text-blue-500 transition cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Register
          </li>
          <li
            className="hover:text-blue-500 transition cursor-pointer"
            onClick={() => navigate("/logout")}
          >
            Logout
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
