import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { apiUrl } from "../api/api";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("male");

  const navigate = useNavigate();

  const successToast = (msg) => {
    toast.success(msg, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const errorToast = (msg) => {
    toast.error(msg, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        `${apiUrl}/api/register`,
        {
          username,
          fullname,
          password,
          gender,
        },
        {
          withCredentials: true,
        }
      );
      // console.log(response.data.success);
      if (response.data.success) {
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }

      successToast(response.data.message);
    } catch (error) {
      // console.log(error.response.data.message);
      errorToast(error.response.data.message);
    }
  };

  const goLogin = () => navigate("/");

  return (
    <div className="w-full">
      <ToastContainer />
      <div className="flex h-screen w-full items-center justify-center bg-gray-100">
        <div className="w-full max-w-3xl overflow-hidden rounded-lg bg-white shadow-lg sm:flex">
          <div
            className="m-2 w-full rounded-2xl bg-gray-400 bg-cover bg-center text-white sm:w-2/5"
            style={{
              backgroundimage: "url(/images/Vd9EQVZZRa9vVAMWfadpV.png)",
            }}
          ></div>
          <div className="w-full sm:w-3/5">
            <div className="p-8">
              <h1 className="text-3xl font-black text-slate-700">Sign up</h1>
              <p className="mt-2 mb-5 text-base leading-tight text-gray-600">
                Create an account to get access to 1000+ Freebies
              </p>
              <form className="mt-8">
                <div className="relative mt-2 w-full">
                  <input
                    type="text"
                    id="username"
                    className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 "
                    placeholder=" "
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
                    Enter Your username
                  </label>
                </div>
                <div className="flex gap-5">
                  <div className="relative mt-2 w-full">
                    <input
                      type="text"
                      id="name"
                      className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                      placeholder=" "
                      onChange={(e) => setFullname(e.target.value)}
                    />
                    <label
                      htmlFor="floating_outlined"
                      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                    >
                      {" "}
                      Enter Your Name{" "}
                    </label>
                  </div>
                  <div className="relative mt-2 w-full">
                    <input
                      type="password"
                      id="password"
                      className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                      placeholder=" "
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label
                      htmlFor="floating_outlined"
                      className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
                    >
                      {" "}
                      Password{" "}
                    </label>
                  </div>
                </div>

                <div className="flex gap-x-4 py-2">
                  <div className="relative flex w-56 items-center justify-center rounded-xl bg-gray-50 px-4 py-3 font-medium text-gray-700">
                    <input
                      className="peer hidden"
                      type="radio"
                      name="radio"
                      id="radio1"
                      onClick={() => setGender("male")}
                    />
                    <label
                      className="peer-checked:border-blue-400 peer-checked:bg-blue-200 absolute top-0 h-full w-full cursor-pointer rounded-xl border"
                      htmlFor="radio1"
                    >
                      {" "}
                    </label>
                    <div className="peer-checked:border-transparent peer-checked:bg-blue-400 peer-checked:ring-2 absolute left-4 h-5 w-5 rounded-full border-2 border-gray-300 bg-gray-200 ring-blue-400 ring-offset-2"></div>
                    <span className="pointer-events-none z-10">Male</span>
                  </div>

                  <div className="relative flex w-56 items-center justify-center rounded-xl bg-gray-50 px-4 py-3 font-medium text-gray-700">
                    <input
                      className="peer hidden"
                      type="radio"
                      name="radio"
                      id="radio3"
                      onClick={() => setGender("female")}
                    />
                    <label
                      className="peer-checked:border-blue-400 peer-checked:bg-blue-200 absolute top-0 h-full w-full cursor-pointer rounded-xl border"
                      htmlFor="radio3"
                    >
                      {" "}
                    </label>
                    <div className="peer-checked:border-transparent peer-checked:bg-blue-400 peer-checked:ring-2 absolute left-4 h-5 w-5 rounded-full border-2 border-gray-300 bg-gray-200 ring-blue-400 ring-offset-2"></div>
                    <span className="pointer-events-none z-10">Female</span>
                  </div>
                </div>
              </form>
              <input
                className="mt-4 w-full cursor-pointer rounded-lg bg-blue-600 pt-3 pb-3 text-white shadow-lg hover:bg-blue-400"
                type="submit"
                value="Create account"
                onClick={handleRegister}
              />
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <a
                    href="#"
                    className="font-bold text-blue-600 no-underline hover:text-blue-400"
                    onClick={goLogin}
                  >
                    login
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
