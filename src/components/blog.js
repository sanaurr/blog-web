"use client";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { LoadingContext } from "@/contexts/loading-context";
import { getAllPosts } from "./api-calls";
export default function Blog({category}) {
  const [articles, setArticles] = useState([]);
  const router = useRouter();
  const { setIsLoading } = useContext(LoadingContext);

  useEffect(() => {
    getAllPosts(category)
      .then(setArticles)
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [category]);
  const viewblog = (art) => {
    setIsLoading(true);
    const category = art.category.replace(/\s+/g, "-").toLowerCase();
    const title = art.title.replace(/\s+/g, "-").toLowerCase();
    router.push(`/${category}/${title}-${art.id}`);
  };
  return (
    <section className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 py-8 px-2 bg-neuBase dark:bg-neuBaseDark">
      {articles.map((a, i) => (
        <article
          key={i}
          className="bg-neuBase dark:bg-neuBaseDark rounded-2xl shadow-neu dark:shadow-neuDark hover:shadow-neuLg dark:hover:shadow-neuLgDark transition-transform hover:-translate-y-1 flex flex-col h-full text-neuText dark:text-neuTextDark"
        >
          <div className="p-6 flex flex-col flex-1">
            <span className="self-start mb-2 bg-gradient-to-r from-yellow-200 to-yellow-100 dark:from-yellow-900 dark:to-yellow-800 text-yellow-800 dark:text-yellow-100 text-xs px-3 py-1 rounded-full font-semibold shadow-sm border border-yellow-100 dark:border-yellow-900">
              {a.category}
            </span>
            <h3 className="font-extrabold text-lg text-neuText dark:text-neuTextDark mb-2 line-clamp-2 leading-tight">
              {a.title}
            </h3>
            <div className="flex items-center mb-3">
              <span className="inline-block w-8 h-8 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 rounded-full flex items-center justify-center font-bold mr-2 shadow-neu dark:shadow-neuDark">
                {a.author?.[0]?.toUpperCase() || "A"}
              </span>
              <span className="text-neuText dark:text-neuTextDark text-sm font-medium">
                {a.author}
              </span>
            </div>
            <p className="text-neuText dark:text-neuTextDark text-sm mb-4 line-clamp-3 whitespace-pre-line break-words flex-1">
              {a.content}
            </p>
            {a.tags && a.tags.length > 0 && (
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
            <button
              onClick={() => viewblog(a)}
              className="mt-auto inline-block font-semibold px-4 py-2 rounded-xl bg-neuBase dark:bg-neuBaseDark text-neuText dark:text-neuTextDark shadow-neu dark:shadow-neuDark hover:shadow-neuLg dark:hover:shadow-neuLgDark active:shadow-neuInset dark:active:shadow-neuInsetDark transition-shadow border border-transparent"
            >
              Read more
            </button>
          </div>
        </article>
      ))}
    </section>
  );
}
