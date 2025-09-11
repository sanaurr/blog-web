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
      className={`ml-4 px-6 py-2 rounded-xl font-semibold transition focus:outline-none 
        bg-neuBase text-neuText shadow-neu 
        dark:bg-neuBaseDark dark:text-neuTextDark dark:shadow-neuDark 
        hover:shadow-neuInset dark:hover:shadow-neuInsetDark`}
      onClick={addblog}
    >
      Create
    </button>
  ) : (
    <div></div>
  );
}
