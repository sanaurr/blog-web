"use client";

import { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import AlertDialog from "@/components/alert";
import { UserContext } from "@/contexts/user-context";
import { LoadingContext } from "@/contexts/loading-context";
import { logIn, signup } from "@/components/api-calls";


export default function Signup() {
  const [islogin, setLogin] = useState(true);
  const [signupmail, setSignupmail] = useState("");
  const [signuppass, setSignuppass] = useState("");
  const [name, setName] = useState("");
  const [loginmail, setLoginmail] = useState("");
  const [loginpass, setLoginpass] = useState("");
  const { login, isloggedin } = useContext(UserContext);
  const [error, setError] = useState(null);
  const { setIsLoading } = useContext(LoadingContext);
  const router = useRouter();
  useEffect(() => {
    if (isloggedin) {
      router.push("/");
    }
  }, [isloggedin]);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  function triggererror(msg) {
    setError(msg);
  }

  async function handleSignup(e) {
    e.preventDefault();
    let formdata = new FormData();
    formdata.append("name", name);
    formdata.append("email", signupmail);
    formdata.append("password", signuppass);
    signup(formdata)
      .then((data) => {
        login(data);
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  }

  async function handleLogin(e) {
    e.preventDefault();
    let formdata = new FormData();
    formdata.append("email", loginmail);
    formdata.append("password", loginpass);
    logIn(formdata)
      .then((data) => {
        login(data);
      })
      .catch((error) => {
        triggererror(error.response.data.message);
      });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#e0e5ec]">
      <div className="bg-[#e0e5ec] rounded-2xl shadow-[8px_8px_16px_#b8bac0,_-8px_-8px_16px_#fff] p-10 w-full max-w-md">
        {error && <AlertDialog errorMessage={error} />}
        <form onSubmit={islogin ? handleLogin : handleSignup} className="space-y-6">
          {!islogin && (
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#e0e5ec] text-gray-700 shadow-inner focus:outline-none"
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={islogin ? loginmail : signupmail}
            onChange={e => islogin ? setLoginmail(e.target.value) : setSignupmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-[#e0e5ec] text-gray-700 shadow-inner focus:outline-none"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={islogin ? loginpass : signuppass}
            onChange={e => islogin ? setLoginpass(e.target.value) : setSignuppass(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-[#e0e5ec] text-gray-700 shadow-inner focus:outline-none"
            required
          />
          <button type="submit" className="w-full py-3 rounded-xl bg-[#e0e5ec] text-gray-700 font-semibold shadow-[4px_4px_8px_#b8bac0,_-4px_-4px_8px_#fff] hover:shadow-inner transition">
            {islogin ? "Login" : "Sign Up"}
          </button>
        </form>
        <div className="mt-6 text-center">
          <button onClick={() => setLogin(!islogin)} className="text-blue-600 hover:underline">
            {islogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  );
}
