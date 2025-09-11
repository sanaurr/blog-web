"use client";
import { UserContext } from "@/contexts/user-context";
import { motion } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import { useContext, useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const signupPage = () => {
    router.push("/signup");
  };
  const { isloggedin, logout } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);

  // Dark Mode State
  const [darkMode, setDarkMode] = useState(false);

  // Load theme from localStorage
  useEffect(() => {
    if (localStorage.theme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      localStorage.theme = "light";
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    } else {
      localStorage.theme = "dark";
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  };

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "My Blog", path: "/myblog" },
    { label: "Latest", path: "/latest" },
    { label: "About", path: "/about" },
  ];

  return (
    <div className="w-full fixed top-0 bg-neuBase dark:bg-neuBaseDark shadow-neu dark:shadow-neuDark z-50">
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
          className="sm:hidden p-2 ml-2 rounded-md bg-neuBase dark:bg-neuBaseDark text-neuText dark:text-neuTextDark focus:outline-none"
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
                className={`px-5 py-2 rounded-2xl bg-neuBase dark:bg-neuBaseDark text-neuText dark:text-neuTextDark shadow-neu dark:shadow-neuDark hover:shadow-inner transition-all text-base md:text-lg ${
                  isSelected ? "shadow-inner dark:shadow-neuInsetDark" : ""
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

        {/* Auth + Theme Toggle (desktop) */}
        <div className="hidden sm:flex items-center gap-3 ml-4">
          <motion.button
            key={isloggedin}
            onClick={isloggedin ? logout : signupPage}
            className="px-6 py-2 rounded-2xl bg-neuBase dark:bg-neuBaseDark text-neuText dark:text-neuTextDark font-semibold shadow-neu dark:shadow-neuDark hover:shadow-inner transition-all text-base md:text-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            {isloggedin ? "Logout" : "Sign Up"}
          </motion.button>

          {/* Theme Toggle */}
          <motion.button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-neuBase dark:bg-neuBaseDark shadow-neu dark:shadow-neuDark hover:shadow-inner transition-all"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {darkMode ? (
              <Sun className="w-6 h-6 text-yellow-400" />
            ) : (
              <Moon className="w-6 h-6 text-neuText" />
            )}
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
          className={`absolute top-full left-0 w-full bg-neuBase dark:bg-neuBaseDark shadow-lg flex flex-col items-center gap-4 py-4 transition-all duration-300 z-50 sm:hidden ${
            menuOpen ? "block" : "hidden"
          }`}
        >
          {navLinks.map((link) => {
            const isSelected = pathname === link.path;
            return (
              <button
                key={link.label}
                className={`w-11/12 px-5 py-2 rounded-2xl bg-neuBase dark:bg-neuBaseDark text-neuText dark:text-neuTextDark shadow-neu dark:shadow-neuDark hover:shadow-inner transition-all text-base ${
                  isSelected ? "shadow-inner dark:shadow-neuInsetDark" : ""
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
          <div className="flex w-11/12 gap-3">
            <button
              onClick={() => {
                setMenuOpen(false);
                isloggedin ? logout() : signupPage();
              }}
              className="flex-1 px-6 py-2 rounded-2xl bg-neuBase dark:bg-neuBaseDark text-neuText dark:text-neuTextDark font-semibold shadow-neu dark:shadow-neuDark hover:shadow-inner transition-all text-base"
            >
              {isloggedin ? "Logout" : "Sign Up"}
            </button>

            {/* Theme Toggle (Mobile) */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-neuBase dark:bg-neuBaseDark shadow-neu dark:shadow-neuDark hover:shadow-inner transition-all"
            >
              {darkMode ? (
                <Sun className="w-6 h-6 text-yellow-400" />
              ) : (
                <Moon className="w-6 h-6 text-neuText" />
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
