import Header from "./Header";
import { useState, useRef } from "react";
import { background_URL } from "../utils/links";
import { checkvalidData } from "../utils/validate";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";
const Login = () => {
  const [Islogin, setIslogin] = useState(true);
  const [errorMessage, seterrorMassage] = useState(null);

  const email = useRef(null);
  const password = useRef(null);

  const HanddlebtnClick = () => {
    // Check Validation
    const message = checkvalidData(email.current.value, password.current.value);
    seterrorMassage(message);
    if (message) return;

    // Procced to Sign In/ Sign Up

    if (!Islogin) {
      // Sign Up
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          seterrorMassage(errorCode + " " + errorMessage)
          // ..
        });
    } else {
      // Sign In
    }
  };
  const toggle = () => {
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
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="flex flex-col flex-wrap w-1/4 bg-[#000000c3] p-4 rounded-lg"
        >
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
            ref={email}
            type="text"
            placeholder="Email Address"
            className="mt-4 p-2 rounded-md outline-none bg-gray-700 text-white"
          ></input>
          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="mt-4 p-2 rounded-md outline-none bg-gray-700 text-white"
          />
          <button
            className="text-white mt-4 p-2 bg-red-700 rounded-md"
            onClick={HanddlebtnClick}
          >
            {!Islogin ? "Sign Up" : "Sign In"}
          </button>
          <p className="mt-4  text-lg text-red-500">{errorMessage}</p>
          <label htmlFor="checkbox" className="text-white cursor-pointer mt-2">
            <input
              id="checkbox"
              type="checkbox"
              className="mr-2 cursor-pointer"
            />
            Remember Me
          </label>
          <p
            className="text-white mt-4 font-bold cursor-pointer"
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
