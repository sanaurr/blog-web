"use client";
import Addbutton from "@/components/addblogbutton";
import Blog from "@/components/blog";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [category, setCategory] = useState("All");

  return (
    <motion.div
      className="bg-neuBase dark:bg-neuBaseDark pt-10 transition-colors"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex">
        <aside
          className={`fixed lg:static top-0 left-0 h-full lg:h-auto w-64 lg:w-1/4 bg-neuBase dark:bg-neuBaseDark shadow-neu dark:shadow-neuDark z-40 p-6 transition-transform duration-300 lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:rounded-2xl flex flex-col items-center`}
        >
          <div className="w-full flex justify-end lg:hidden mb-4">
            <button
              onClick={() => setSidebarOpen(false)}
              aria-label="Close sidebar"
              className="p-2"
            >
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="flex w-full items-center">
            <div className="flex-1 overflow-hidden text-neuText dark:text-neuTextDark bg-neuBase dark:bg-neuBaseDark shadow-neuInset dark:shadow-neuInsetDark">
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-6 py-4 bg-transparent text-gray-700 dark:text-neuTextDark focus:outline-none placeholder-gray-400 dark:placeholder-gray-400"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="ml-4 w-16 h-16 rounded-full flex items-center justify-center text-gray-700 dark:text-neuTextDark bg-neuBase dark:bg-neuBaseDark shadow-neu dark:shadow-neuDark"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </motion.button>
          </div>

          <ul className="mt-[5rem] w-full flex flex-col gap-6">
            {[
              "All",
              "Technology",
              "Lifestyle",
              "Travel",
              "Health",
              "Business",
              "Politics",
            ].map((cat, idx) => (
              <motion.li
                key={cat}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.05 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
              >
                <div
                  onClick={() => setCategory(cat)}
                  className={`block text-neuText dark:text-neuTextDark bg-neuBase dark:bg-neuBaseDark 
                    rounded-2xl px-5 py-3 shadow-neu dark:shadow-neuDark text-center font-medium
                    tracking-wide transition-all duration-200 cursor-pointer ${
                      category === cat
                        ? "bg-gray-200 dark:bg-gray-700 shadow-neuInset dark:shadow-neuInsetDark"
                        : "hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                >
                  {cat}
                </div>
              </motion.li>
            ))}
          </ul>
        </aside>

        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        <main className="flex-1 lg:ml-5 overflow-y-auto h-[calc(100vh-7rem)] p-4 sm:p-8">
          <div className="lg:hidden flex items-center mb-4">
            <button
              className="p-2 rounded-md bg-neuBase dark:bg-neuBaseDark shadow-neu dark:shadow-neuDark text-neuText dark:text-neuTextDark focus:outline-none"
              onClick={() => setSidebarOpen((v) => !v)}
              aria-label="Toggle filter"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <line x1="4" y1="6" x2="20" y2="6" />
                <circle cx="10" cy="6" r="2" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <circle cx="16" cy="12" r="2" />
                <line x1="4" y1="18" x2="20" y2="18" />
                <circle cx="8" cy="18" r="2" />
              </svg>
            </button>
          </div>
          <div className="flex flex-col md:flex-row items-start justify-start w-full gap-4">
            <div className="flex w-full md:w-[420px]">
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-4 py-3 rounded-l-2xl bg-neuBase dark:bg-neuBaseDark text-neuText dark:text-neuTextDark shadow-neuInset dark:shadow-neuInsetDark focus:outline-none transition-all"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="px-6 py-3 rounded-r-2xl bg-neuBase dark:bg-neuBaseDark shadow-neu dark:shadow-neuDark text-neuText dark:text-neuTextDark font-medium transition-all -ml-1"
              >
                Search
              </motion.button>
            </div>
            <div className="min-w-[120px] mt-2 md:mt-0">
              <Addbutton />
            </div>
          </div>

          <motion.div
            className="mt-6 sm:mt-8 rounded-2xl min-h-[300px] sm:min-h-[400px]"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
          >
            <Blog category={category} />
          </motion.div>
        </main>
      </div>
    </motion.div>
  );
}
