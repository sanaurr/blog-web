"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useContext } from "react";
import { getPostByUserId } from "../../components/api-calls";
import { UserContext } from "../../contexts/user-context";
import { LoadingContext } from "@/contexts/loading-context";
import { motion } from "framer-motion";

export default function MyBlogPage() {
  const { id, accessToken } = useContext(UserContext);
  const { setIsLoading } = useContext(LoadingContext);
  const [articles, setArticles] = useState([]);
  const router = useRouter();

  useEffect(() => {
    console.log("init", id, accessToken);
    if (!id || !accessToken) {
      setIsLoading(false);
      console.log(id, "userid in myblog");
      console.log(accessToken, "token in myblog");
      console.log("User ID is not available.");
      return;
    }
    console.log(id, "userid in myblog useeffect before api call");
    getPostByUserId(id, accessToken)
      .then(setArticles)
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id, accessToken]);
  const viewblog = (art) => {
    setIsLoading(true);
    const category = art.category.replace(/\s+/g, "-").toLowerCase();
    const title = art.title.replace(/\s+/g, "-").toLowerCase();
    router.push(`/${category}/${title}-${art.id}`);
  };
  if (articles !== null || articles.length !== 0) {
    console.log(articles, "articles in myblog");
  }
  return (
    <div className="h-screen bg-neuBase overflow-y-auto">
      <motion.div
        className="p-10 bg-neuBase flex flex-col items-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
      >
        <section className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 py-8 px-2">
          {articles.map((a, i) => (
            <article
              key={i}
              className="bg-neuBase rounded-2xl shadow-neu hover:shadow-neuLg transition-transform hover:-translate-y-1 flex flex-col h-full text-neuText"
            >
              <div className="p-6 flex flex-col flex-1">
                <span className="self-start mb-2 bg-gradient-to-r from-yellow-200 to-yellow-100 text-yellow-800 text-xs px-3 py-1 rounded-full font-semibold shadow-sm border border-yellow-100">
                  {a.category}
                </span>
                <h3 className="font-extrabold text-lg text-neuText mb-2 line-clamp-2 leading-tight">
                  {a.title}
                </h3>
                <div className="flex items-center mb-3">
                  <span className="inline-block w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold mr-2 shadow-neu">
                    {a.author?.[0]?.toUpperCase() || "A"}
                  </span>
                  <span className="text-neuText text-sm font-medium">
                    {a.author}
                  </span>
                </div>
                <p className="text-neuText text-sm mb-4 line-clamp-3 whitespace-pre-line break-words flex-1">
                  {a.content}
                </p>
                {a.tags && a.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {a.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs font-semibold border border-blue-100 shadow-neu"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
                <button
                  onClick={() => viewblog(a)}
                  className="mt-auto inline-block font-semibold px-4 py-2 rounded-xl bg-neuBase text-neuText shadow-neu hover:shadow-neuLg active:shadow-neuInset transition-shadow border border-transparent"
                >
                  Read more
                </button>
              </div>
            </article>
          ))}
        </section>
      </motion.div>
      </div>
  );
}
