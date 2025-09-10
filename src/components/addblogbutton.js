"use client";
import { UserContext } from "@/contexts/user-context";
import { useRouter } from "next/navigation";
import { useContext } from "react";
export default function Addbutton() {
  const router = useRouter();
  const { isloggedin } = useContext(UserContext);
  const addblog = () => {
    router.push("/createblog");
  };
  return isloggedin ? (
    <button
      className="ml-4 px-6 py-2 rounded-xl bg-[#e0e5ec] text-gray-700 font-semibold shadow-[4px_4px_8px_#b8bac0,_-4px_-4px_8px_#fff] hover:shadow-inner transition focus:outline-none"
      onClick={addblog}
    >
      Create
    </button>
  ) : (
    <div></div>
  );
}
