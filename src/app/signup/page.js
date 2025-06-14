'use client'

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
    const {login, isloggedin } = useContext(UserContext);
    const [error, setError] = useState(null);
    const {setIsLoading} = useContext(LoadingContext);
    const router = useRouter();
    useEffect(() => {
        if (isloggedin) {
            router.push('/');
        }
    }, [isloggedin]);
    
    useEffect(() => {
        setIsLoading(false);
    },[]);

    function triggererror(msg) {
        setError(msg);
    }

    async function handleSignup(e) {
        e.preventDefault();
        console.log('submit func');
        let formdata = new FormData();
        formdata.append("name", name);
        formdata.append("email", signupmail);
        formdata.append("password", signuppass);

        //  await axios.post('http://localhost:3005/users/', formdata, {
        //     headers: {
        //       'Content-Type': 'multipart/form-data'
        //     }
        //   })
        //   .then(response => {
        //     console.log('Response:', response.data);
        //     if (response.data) {
        //         // console.log(response.data);
        //         login(response.data);
        //     }
        //   })
        //   .catch(error => {
        //     console.error('Error:', error);
        //     setError(error.response.data.message);
        //   });

        //   console.log(token);
        
        signup(formdata).then(data =>{
            login(data);
        }).catch(error => {
            setError(error.response.data.message);
            console.log(error);
        });

        localStorage.setItem("accessToken", token.accessToken);
        localStorage.setItem("refreshToken", token.refreshToken);

    }

    async function handleLogin(e) {
        e.preventDefault();
        let formdata = new FormData();
        formdata.append("email", loginmail);
        formdata.append("password", loginpass);
        console.log(formdata);

       

            // await axios.post('http://localhost:3005/login/', formdata, {
            //     headers: {
            //       'Content-Type': 'multipart/form-data'
            //     }
            //   })
            //   .then(response => {
            //     console.log('Response:', response.data);
            //     login(response.data);
            //   })
            //   .catch(error => {
            //     triggererror(error.response.data.message);
            //     console.error('Error:', error);
            //   });
            logIn(formdata).then(data =>{
                login(data);
            }).catch(error => {
                console.log("inside catch");
                // triggererror(error.response.data.message);
                console.log(error);
            });
       
    }

    return (
        <>
            {islogin ? (
                <div className="min-h-screen flex items-center justify-center bg-gray-400">
                    <motion.div 
                        className="relative bg-blue-400 shadow-lg rounded-xl p-8 max-w-sm w-full z-10"
                        key="login"
                        initial={{ opacity: 0, y: -100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-2xl font-bold mb-4">Login</h2>
                        <form>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-700">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    onChange={(e) => setLoginmail(e.target.value)}
                                    placeholder="Email Address"
                                    className="w-full px-4 py-2 mt-1 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor ="password" className="block text-gray-700">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    onChange={(e) => setLoginpass(e.target.value)}
                                    placeholder="Password"
                                    className="w-full px-4 py-2 mt-1 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                onClick={handleLogin}
                                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                                Login
                            </button>
                        </form>
                        {/* <div className="mt-6 text-center">
                             <button
                                 className="w-full bg-white border border-gray-300 text-gray-700 py-2 rounded-md flex items-center justify-center hover:bg-gray-100 focus:outline-none">
                                 <img src="https://img.icons8.com/color/16/000000/google-logo.png" alt="Google Icon" className="mr-2" />
                                 Continue with Google
                             </button>
                         </div> */}
                        <div>
                            <p className="text-center text-gray-500 mt-4">Don't have an account? <button onClick={() => setLogin(false)} className="text-gray-900 hover:text-white">Signup</button></p>
                        </div>
                    </motion.div>
                    <div className="absolute bg-gradient-to-r from-gray-200 to-white rounded-xl w-[430px] h-[370px] transform -rotate-6 z-0"></div>
                </div>
            ) : (
                <div className="min-h-screen flex items-center justify-center bg-gray-400">
                    <motion.div 
                    className="relative bg-white shadow-lg rounded-xl p-8 max-w-sm w-full z-10"
                    key="signup"
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-2xl font-bold mb-4">Sign up</h2>
                        <form>
                            <div className="mb-4">
                                <label htmlhtmlFor="email" className="block text-gray-700">User Name</label>
                                <input
                                    id="name"
                                    placeholder="Full Name"
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-4 py-2 mt-1 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlhtmlFor="email" className="block text-gray-700">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    onChange={(e) => setSignupmail(e.target.value)}
                                    placeholder="Email Address"
                                    className="w-full px-4 py-2 mt-1 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlhtmlFor="password" className="block text-gray-700">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    onChange={(e) => setSignuppass(e.target.value)}
                                    placeholder="Password"
                                    className="w-full px-4 py-2 mt-1 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                onClick={handleSignup}
                                className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                                Submit
                            </button>
                        </form>
                        <div>
                            <p className="text-center text-gray-500 mt-4">Already have an account?
                                <button
                                    onClick={() => {
                                            return setLogin(true);
                                        }}
                                    className="text-blue-500 hover:text-blue-700">
                                    Login
                                </button>
                            </p>
                        </div>
                    </motion.div>
                    <div className="absolute bg-gradient-to-r from-blue-400 to-blue-500 rounded-xl w-[430px] h-[370px] transform -rotate-6 z-0"></div>
                    {error && <AlertDialog error={error} />}
                </div>
            )}
        </>
    );
}
