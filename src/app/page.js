
import Addbutton from "@/components/addblogbutton";
import Blog from "@/components/blog";



export default async function Home() {

  



    return (
        <div className="min-h-screen bg-gray-500 pt-10">
            <div className="flex items-center justify-between max-w-md mx-auto ">

                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full px-4 py-2 text-gray-700 bg-gray-100 rounded-l-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <button
                    className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-6 py-2 rounded-r-full focus:outline-none">
                    Search
                </button>
                
                    <div className="min-w-[150px]">
                        <Addbutton />
                    </div>
            </div>
            <div className="container mx-6 px-3 py-8">
                <div className="flex justify-between">
                    <aside className="w-auto">
                        <div className="flex items-center max-w-md mx-auto mt-10">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-1/2 px-4 py-2 text-gray-700 bg-gray-100 rounded-l-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                className="bg-gradient-to-r from-blue-400 to-blue-800 text-white px-6 py-2 rounded-r-full focus:outline-none">
                                Search
                            </button>
                        </div>
                        <h3 className="mt-8 font-semibold text-black bg-yellow-200 rounded px-5 py-2 w-1/2 ">Categories</h3>
                        <ul className="m-6 space-y-6">
                            <li><a href="#" className=" text-white bg-blue-800 rounded px-5 py-2 hover:bg-blue-400">All</a></li>
                            <li><a href="#" className=" text-white bg-blue-800 rounded px-5 py-2 hover:bg-blue-400">Expert Hot Seat</a></li>
                            <li><a href="#" className=" text-white bg-blue-800 rounded px-5 py-2 hover:bg-blue-400">Facilitation</a></li>
                            <li><a href="#" className=" text-white bg-blue-800 rounded px-5 py-2 hover:bg-blue-400">Webinar</a></li>
                            <li><a href="#" className=" text-white bg-blue-800 rounded px-5 py-2 hover:bg-blue-400">Retrium Updates</a></li>
                            <li><a href="#" className=" text-white bg-blue-800 rounded px-5 py-2 hover:bg-blue-400">Collaboration</a></li>
                            <li><a href="#" className=" text-white bg-blue-800 rounded px-5 py-2 hover:bg-blue-400">Retrospective Quick Tips</a></li>
                            <li><a href="#" className=" text-white bg-blue-800 rounded px-5 py-2 hover:bg-blue-400">Agile Practices 101</a></li>
                        </ul>
                    </aside>

                    <Blog />
                </div>
            </div>
        </div>
    );
}

