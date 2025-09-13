"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useContext } from "react";
import { getLatestPosts } from "../../components/api-calls";
import { LoadingContext } from "@/contexts/loading-context";
import { motion } from "framer-motion";

export default function LatestBlogsPage() {
  const { setIsLoading } = useContext(LoadingContext);
  const [articles, setArticles] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getLatestPosts()
      .then(setArticles)
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const viewblog = (art) => {
    setIsLoading(true);
    const category = art.category.replace(/\s+/g, "-").toLowerCase();
    const title = art.title.replace(/\s+/g, "-").toLowerCase();
    router.push(`/${category}/${title}-${art.id}`);
  };

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } },
  };

  return (
    <div className="h-[calc(100vh-7rem)] bg-neuBase dark:bg-neuBaseDark text-neuText dark:text-neuTextDark overflow-y-auto">
      <motion.div
        className="flex flex-col"
        initial="hidden"
        animate="show"
        variants={containerVariants}
      >
        {/* Scroll only inside here */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="w-full p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 overflow-y-auto flex-1"
        >
          {articles.map((a, i) => (
            <motion.article
              key={i}
              variants={cardVariants}
              whileHover={{
                scale: 0.98,
                boxShadow: "0px 8px 20px rgba(0,0,0,0.12)",
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-neuBase dark:bg-neuBaseDark rounded-2xl shadow-neu hover:shadow-neuLg dark:shadow-neuDark dark:hover:shadow-neuLgDark transition-transform flex flex-col h-full text-neuText dark:text-neuTextDark"
            >
              <div className="p-6 flex flex-col flex-1">
                <span className="self-start mb-2 bg-gradient-to-r from-yellow-200 to-yellow-100 dark:from-yellow-900 dark:to-yellow-800 text-yellow-800 dark:text-yellow-100 text-xs px-3 py-1 rounded-full font-semibold shadow-sm border border-yellow-100 dark:border-yellow-900">
                  {a.category}
                </span>
                <h3 className="font-extrabold text-lg mb-2 line-clamp-2 leading-tight">
                  {a.title}
                </h3>
                <div className="flex items-center mb-3">
                  <span className="inline-block w-8 h-8 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 rounded-full flex items-center justify-center font-bold mr-2 shadow-neu dark:shadow-neuDark">
                    {a.author?.[0]?.toUpperCase() || "A"}
                  </span>
                  <span className="text-sm font-medium">{a.author}</span>
                </div>
                <p className="text-sm mb-4 line-clamp-3 whitespace-pre-line break-words flex-1">
                  {a.content}
                </p>
                {a.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {a.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-200 px-2 py-1 rounded-full text-xs font-semibold border border-blue-100 dark:border-blue-900 shadow-neu dark:shadow-neuDark"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
                <motion.button
                  onClick={() => viewblog(a)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-auto inline-block font-semibold px-4 py-2 rounded-xl shadow-neu hover:shadow-neuLg dark:shadow-neuDark dark:hover:shadow-neuLgDark active:shadow-neuInset dark:active:shadow-neuInsetDark transition-shadow border border-transparent"
                >
                  Read more
                </motion.button>
              </div>
            </motion.article>
          ))}
        </motion.section>
      </motion.div>
    </div>
  );
}
