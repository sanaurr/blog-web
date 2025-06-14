'use client'
import { UserContext } from "@/contexts/user-context";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useContext } from "react";
export default function Navbar() {
    const router = useRouter();
    const signupPage = () => {
        router.push('/signup');
    }

    const {isloggedin, logout} = useContext(UserContext);
    return (
        <div className="bg-blue-400">
        <div className="flex justify-between items-center p-4 bg ">
            <img src="/logo.png" alt="Logo" className="h-8"></img>

            <nav className="ml-10 space-x-20">
                <motion.button
                    className="text-white hover:bg-blue-600 rounded px-5 py-2 "
                    onClick={() => router.push('/')}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >Home</motion.button>
                <motion.button
                    className="text-white hover:bg-blue-600 rounded px-5 py-2 "
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >Blog</motion.button>
                <motion.button
                    className="text-white hover:bg-blue-600 rounded px-5 py-2 "
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >About</motion.button>
                <motion.button
                    className="text-white hover:bg-blue-600 rounded px-5 py-2 "
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >Content</motion.button>
            </nav>
            <div>

                <motion.button
                    key={isloggedin}
                    onClick={ isloggedin ? logout : signupPage} 
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    { isloggedin ? "Logout" : 'Sign Up' }
                 </motion.button>
            </div>
        </div>
    </div>

    )
}