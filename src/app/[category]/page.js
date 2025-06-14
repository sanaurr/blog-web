'use client'
import { useRouter } from "next/navigation";

export default function Category({ params: { category } }) {
    const router = useRouter();
    const viewblog = () => {
        router.push('/article/art-1');
    }
    return (
        <div className="min-h-screen bg-gray-500 pt-10">
            <div className="max-w-4xl mx-auto bg-gray-700 text-white p-8 shadow-lg rounded-lg">
                <div className="flex items-center  mb-4" >
                    <h1 className="text-3xl font-bold mb-4 inline-block bg-yellow-200 text-yellow-800 px-2 py-1 rounded-[10px]" >Category Name</h1>
                </div>
                <section className="w-auto flex flex-wrap items-start gap-6">
                                <article className="bg-white p-4 rounded-lg shadow-md w-[300px]">
                                    {/* <Image src="/image1.jpg" alt="Blog Post Image" width={400} height={200} className="rounded-t-lg" /> */}
                                    <div className="p-4">
                                        {/* <span className="inline-block bg-yellow-200 text-yellow-800 text-xs px-2 py-1 rounded-full">Webinar</span> */}
                                        <h3 className="mt-2 font-bold text-gray-800">Successfully Distributed: How To Thrive As a Remote Agile Team</h3>
                                        {/* <p className="text-gray-600 text-sm">Webinar Follow-Up</p> */}
                                        <div className="mt-2">
                                            <span className="text-gray-500 text-xs">Agile Practices 101</span>
                                        </div>
                                        <button onClick={viewblog} className="mt-4 inline-block text-yellow-600 hover:underline">Read more</button>
                                    </div>
                                </article>

                                <article className="bg-white p-4 rounded-lg shadow-md  w-[300px]">
                                    {/* <Image src="/image2.jpg" alt="Blog Post Image" width={400} height={200} className="rounded-t-lg" /> */}
                                    <div className="p-4">
                                        {/* <span className="inline-block bg-yellow-200 text-yellow-800 text-xs px-2 py-1 rounded-full">Webinar</span> */}
                                        <h3 className="mt-2 font-bold text-gray-800">Webinar Blog Recap: Suddenly Distributed: Tools for Effective Agile Teams</h3>
                                        <p className="text-gray-600 text-sm">Remote Work</p>
                                        <div className="mt-2">
                                            <span className="text-gray-500 text-xs">Agile Practices 101</span>
                                            <span className="ml-2 text-gray-500 text-xs">Psychological Safety</span>
                                            <span className="ml-2 text-gray-500 text-xs">Webinar</span>
                                        </div>
                                        <button className="mt-4 inline-block text-yellow-600 hover:underline">Read more</button>
                                    </div>
                                </article>

                                <article className="bg-white p-4 rounded-lg shadow-md w-[300px]">
                                    {/* <Image src="/image3.jpg" alt="Blog Post Image" width={400} height={200} className="rounded-t-lg" /> */}
                                    <div className="p-4">
                                        {/* <span className="inline-block bg-yellow-200 text-yellow-800 text-xs px-2 py-1 rounded-full">Webinar</span> */}
                                        <h3 className="mt-2 font-bold text-gray-800">Webinar Recap: Effective Retrospectives in the Age of Coronavirus</h3>
                                        <p className="text-gray-600 text-sm">Remote Work</p>
                                        <div className="mt-2">
                                            <span className="text-gray-500 text-xs">Retrospective Quick Tips</span>
                                            <span className="ml-2 text-gray-500 text-xs">Remote Work</span>
                                        </div>
                                        <button className="mt-4 inline-block text-yellow-600 hover:underline">Read more</button>
                                    </div>
                                </article>
                            </section>
            </div>
        </div>
    );
}