"use client";
import { motion } from "framer-motion";
import { LoadingContext } from "@/contexts/loading-context";
import { useContext, useEffect } from "react";

export default function About() {
  const { setIsLoading } = useContext(LoadingContext);
  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <main className="h-[calc(100vh-7rem)] bg-neuBase dark:bg-neuBaseDark overflow-y-auto">
      <div className="text-neuText dark:text-neuTextDark sm:px-6 sm:py-12 flex justify-center">
        <div className="w-full max-w-5xl flex flex-col gap-8 sm:gap-10">
          {/* Hero Section */}
          <section className="flex flex-col items-center text-center">
            <motion.img
              src="/bloglogo.png"
              alt="Blog Logo"
              className="w-20 h-20 sm:w-28 sm:h-28 mb-4 sm:mb-6 border-2 bg-neuBase dark:bg-neuBaseDark shadow-neu dark:shadow-neuDark"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
            />
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              About{" "}
              <span className="text-neuText dark:text-neuTextDark font-semibold">
                ZeeBLOG
              </span>
            </motion.h1>
            <motion.p
              className="max-w-2xl text-base sm:text-lg md:text-xl text-neuText dark:text-neuTextDark"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              Welcome to{" "}
              <span className="font-semibold text-blue-600">ZeeBLOG</span>– your
              modern platform for sharing stories, ideas, and knowledge. Our
              mission is to empower everyone to create, discover, and connect
              through blogging.
            </motion.p>
          </section>

          {/* Cards Section */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* What We Offer */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl bg-neuBase dark:bg-neuBaseDark shadow-neu dark:shadow-neuDark p-4 sm:p-6 md:p-8"
            >
              <h2 className="text-2xl font-bold mb-4">✨ What We Offer</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>📝 Effortless blog creation with an intuitive editor</li>
                <li>🔍 Discover articles by category and trending topics</li>
                <li>👤 Personalized profiles and easy blog management</li>
                <li>🌙 Light & dark mode for comfortable reading</li>
                <li>💬 A growing community of writers and readers</li>
              </ul>
            </motion.div>

            {/* Our Story */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-2xl bg-neuBase dark:bg-neuBaseDark shadow-neu dark:shadow-neuDark p-4 sm:p-6 md:p-8"
            >
              <h2 className="text-2xl font-bold mb-4">📖 Our Story</h2>
              <p>
                ZeeBLOG was created by SANAUR RAHAMAN as a portfolio project who
                believe in the power of words and community. We wanted a space
                that is simple, fast, and inspiring for both new and experienced
                bloggers. Whether you want to share your expertise, document
                your journey, or just express yourself, ZeeBLOG is here for you.
              </p>
            </motion.div>
          </section>

          {/* Contact Section */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-2xl bg-neuBase dark:bg-neuBaseDark shadow-neu dark:shadow-neuDark p-4 sm:p-6 md:p-8 text-center"
          >
            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-neuText dark:text-neuTextDark">
              📩 Get in Touch
            </h2>
            <p className="mb-2 sm:mb-3 text-neuText dark:text-neuTextDark">
              Have questions, feedback, or want to collaborate? Reach out to us
              at{" "}
              <a
                href="mailto:contact@blogweb.com"
                className="text-blue-600 underline"
              >
                sanaur.sp@gmail.com
              </a>
            </p>
            <p className="font-medium text-base sm:text-lg text-neuText dark:text-neuTextDark">
              Thank you for being part of our journey 🚀
            </p>
          </motion.section>
        </div>
      </div>
    </main>
  );
}
