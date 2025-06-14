'use client'
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { LoadingContext } from "@/contexts/loading-context";
import { getAllPosts } from "./api-calls";
export default function Blog({}) {

    const [articles, setArticles] = useState([]);
    const router = useRouter();
    const { setIsLoading } = useContext(LoadingContext);

    useEffect(() => {
        
    getAllPosts().then(setArticles)
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            }).finally(() => {
                setIsLoading(false);
            });
    },[]);
    const viewblog = (art) => {
        setIsLoading(true);
        const category = art.category.replace(/\s+/g, '-').toLowerCase();
        const title = art.title.replace(/\s+/g, '-').toLowerCase();
        router.push(`/${category}/${title}-${art.id}`);

    }
    return (
        <section className="w-3/4 flex flex-wrap items-start gap-6">
        {
            articles.map((a,i) => {
                return (
                    <article key={i} className="bg-white p-4 rounded-lg shadow-md w-[300px]">
                    {/* <Image src="/image1.jpg" alt="Blog Post Image" width={400} height={200} className="rounded-t-lg" /> */}
                    <div className="p-4">
                        <span className="inline-block bg-yellow-200 text-yellow-800 text-xs px-2 py-1 rounded-full">{a.category}</span>
                        <h3 className="mt-2 font-bold text-gray-800">{a.title}</h3>
                        {/* <p className="text-gray-600 text-sm">Webinar Follow-Up</p> */}
                        <div className="mt-2">
                            <span className="text-gray-500 text-xs line-clamp-3">{a.content}</span>
                        </div>
                        <button onClick={() => viewblog(a)} className="mt-4 inline-block text-yellow-600 hover:underline">Read more</button>
                    </div>
                </article>
                );
            })
        }
    </section>
    );
}