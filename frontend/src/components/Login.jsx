import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const notifyError = (msg) => {
    toast.error(msg, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const notifySuccess = (msg) => {
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

  const setUid = (UID) => {};

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("/api/login", {
        username,
        password,
      });
      if (response && response.data && response.data.userID) {
        console.log(response.data.userID);
        // setCurrentUserId(response.data.userID);

        localStorage.setItem("userID", response.data.userID);
   
        console.log(response.data.userID);

        // const storedUserId = localStorage.getItem("userID");
        // console.log("Stored user ID:", storedUserId);

        console.log(response);
      }

      // await dispatch(setCurrentUserId(response.data.userID));
      const sucess = await response.data.message;

      notifySuccess(sucess);
      if (sucess) {
        setTimeout(
          () => navigate("/dashboard"),
          2000
        );
      }
    } catch (error) {
      notifyError(error.response.data);
    }
  };

  const goSignup = () => navigate("/signup");

  return (
    <div className="w-full h-screen content-center">
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
              <h1 className="text-3xl font-black text-slate-700">Login</h1>
              <p className="mt-2 mb-5 text-base leading-tight text-gray-600">
                welcome back
              </p>
              <form className="mt-8">
                <div className="relative mt-2 w-full">
                  <input
                    type="text"
                    id="username"
                    className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                    placeholder=" "
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <label className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600">
                    {" "}
                    Enter Your Username{" "}
                  </label>
                </div>
                <div className="relative mt-2 w-full">
                  <input
                    type="text"
                    id="password"
                    className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                    placeholder=""
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label className="absolute top-2 left-1 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600">
                    {" "}
                    Enter Your Password
                  </label>
                </div>
                <input
                  className="mt-4 w-full cursor-pointer rounded-lg bg-blue-600 pt-3 pb-3 text-white shadow-lg hover:bg-blue-400"
                  type="submit"
                  value="Create account"
                  onClick={handleLogin}
                />
              </form>
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <a
                    href="#"
                    className="font-bold text-blue-600 no-underline hover:text-blue-400"
                    onClick={goSignup}
                  >
                    Sign up
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

export default Login;
