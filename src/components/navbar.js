"use client";
import { UserContext } from "@/contexts/user-context";
import { motion } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import { useContext, useState } from "react";
export default function Navbar() {
const router = useRouter();
const pathname = usePathname();
const signupPage = () => {
  router.push("/signup");
};
const { isloggedin, logout } = useContext(UserContext);
const [menuOpen, setMenuOpen] = useState(false);

const navLinks = [
  { label: "Home", path: "/" },
  { label: "My Blog", path: "/myblog" },
  { label: "Latest", path: "/latest" },
  { label: "About", path: "/about" },
];

return (
  <div className="w-full fixed top-0 bg-neuBase shadow-neu">
    <motion.div
      className="flex items-start justify-between p-3 sm:p-4 mx-auto relative"
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Logo */}
      <img src="/bloglogo.png" alt="Logo" className="w-14 h-16" />

      {/* Hamburger for mobile */}
      <button
        className="sm:hidden p-2 ml-2 rounded-md bg-[#e0e5ec] text-gray-700 focus:outline-none"
        onClick={() => setMenuOpen((v) => !v)}
        aria-label="Toggle menu"
      >
        <svg
          width="28"
          height="28"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Nav Links (desktop) */}
      <nav className="hidden sm:flex gap-4 md:gap-8 lg:gap-20 items-center">
        {navLinks.map((link, idx) => {
          const isSelected = pathname === link.path;
          return (
            <motion.button
              key={link.label}
              className={`px-5 py-2 rounded-2xl bg-[#e0e5ec] text-gray-700 shadow-[4px_4px_8px_#b8bac0,_-4px_-4px_8px_#fff] hover:shadow-inner transition-all text-base md:text-lg ${
                isSelected ? "shadow-inner" : ""
              }`}
              onClick={() => router.push(link.path)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
            >
              {link.label}
            </motion.button>
          );
        })}
      </nav>

      {/* Auth Button (desktop) */}
      <div className="hidden sm:block ml-4">
        <motion.button
          key={isloggedin}
          onClick={isloggedin ? logout : signupPage}
          className="px-6 py-2 rounded-2xl bg-[#e0e5ec] text-gray-700 font-semibold shadow-[4px_4px_8px_#b8bac0,_-4px_-4px_8px_#fff] hover:shadow-inner transition-all text-base md:text-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          {isloggedin ? "Logout" : "Sign Up"}
        </motion.button>
      </div>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 sm:hidden"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}

      {/* Mobile Menu */}
      <div
        className={`absolute top-full left-0 w-full bg-[#e0e5ec] shadow-lg flex flex-col items-center gap-4 py-4 transition-all duration-300 z-50 sm:hidden ${
          menuOpen ? "block" : "hidden"
        }`}
      >
        {navLinks.map((link) => {
          const isSelected = pathname === link.path;
          return (
            <button
              key={link.label}
              className={`w-11/12 px-5 py-2 rounded-2xl bg-[#e0e5ec] text-gray-700 shadow-[4px_4px_8px_#b8bac0,_-4px_-4px_8px_#fff] hover:shadow-inner transition-all text-base ${
                isSelected ? "shadow-inner" : ""
              }`}
              onClick={() => {
                setMenuOpen(false);
                router.push(link.path);
              }}
            >
              {link.label}
            </button>
          );
        })}
        <button
          onClick={() => {
            setMenuOpen(false);
            isloggedin ? logout() : signupPage();
          }}
          className="w-11/12 px-6 py-2 rounded-2xl bg-[#e0e5ec] text-gray-700 font-semibold shadow-[4px_4px_8px_#b8bac0,_-4px_-4px_8px_#fff] hover:shadow-inner transition-all text-base"
        >
          {isloggedin ? "Logout" : "Sign Up"}
        </button>
      </div>
    </motion.div>
  </div>
  );
}
