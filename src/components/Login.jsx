import Header from "./Header";
import { useState } from "react";
import { background_URL } from "../utils/links";
const Login = () => {
  const [Islogin, setIslogin] = useState(true);

  const toggle = (e) => {
    e.preventDefault();
    console.log("clicked");
    setIslogin(!Islogin);
  };
  return (
    <div className="relative">
      <Header />
      <div className="absolute">
        <img src={background_URL} alt="" />
      </div>
      <div className="absolute  w-full mt-40 flex justify-center">
        <form className="flex flex-col flex-wrap w-1/4 bg-[#000000c3] p-4 rounded-lg">
          <h1 className="text-white font-bold text-4xl">
            {Islogin ? "Sign In" : "Sign Up"}
          </h1>
          {!Islogin ? (
            <input
              type="text"
              placeholder="Full Name"
              className="mt-4 p-2 rounded-md outline-none bg-gray-700 text-white"
            ></input>
          ) : (
            ""
          )}
          <input
            type="text"
            placeholder="Email Address"
            className="mt-4 p-2 rounded-md outline-none bg-gray-700 text-white"
          ></input>
          <input
            type="password"
            placeholder="Password"
            className="mt-4 p-2 rounded-md outline-none bg-gray-700 text-white"
          />
          <button
            className="text-white mt-4 p-2 bg-red-700 rounded-md"
            
          >
            {!Islogin ? "Sign Up" : "Sign In"}
          </button>
          <label htmlFor="checkbox" className="text-white cursor-pointer mt-2">
            <input id="checkbox" type="checkbox" className="mr-2" />
            Remember Me
          </label>
          <p className="text-white mt-4 font-bold cursor-pointer"
          onClick={toggle}
          >
            {Islogin
              ? "New To Netflix? Sign Up Now"
              : "Already Registerd ? Sing In Now"}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
