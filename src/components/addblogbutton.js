'use client'
import { UserContext } from "@/contexts/user-context";
import { useRouter } from "next/navigation";
import { useContext } from "react";
export default function Addbutton() {
    const router = useRouter();
    const { isloggedin } = useContext(UserContext);
    const addblog = () => {
        router.push('/createblog');
    }
    return(
        isloggedin ?

            <button 
            className="bg-gradient-to-r from-blue-400 to-blue-600 text-white ml-4 px-6 py-2 rounded-[10px] focus:outline-none"
            onClick={addblog}
            >Create</button>
            : <div></div>
        
    );
}


