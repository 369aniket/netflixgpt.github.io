import Header from "./Header";
import { useState, useRef } from "react";
import { background_URL } from "../utils/links";
import { checkvalidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";

const Login = () => {
  const [Islogin, setIslogin] = useState(true);
  const [errorMessage, seterrorMassage] = useState(null);
  const [isShowPassword, setisShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const HanddlebtnClick = () => {
    // Check Validation
    const message = checkvalidData(email.current.value, password.current.value);
    seterrorMassage(message);
    if (message) return;

    // Proceed to Sign In/Sign Up
    if (!Islogin) {
      // Sign Up
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          // Update profile with displayName
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: "https://avatars.githubusercontent.com/u/150271298?v=4",
          })
            .then(() => {
              // Profile updated
              const { uid, email, password, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
              navigate("/browse");
              // Clear input fields
              name.current.value = "";
              email.current.value = "";
              password.current.value = "";
            })
            .catch((error) => {
              seterrorMassage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          seterrorMassage(errorCode + " " + errorMessage);
          // Clear input fields on error
          name.current.value = "";
          email.current.value = "";
          password.current.value = "";
        });
    } else {
      // Sign In
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          navigate("/browse");
          // Clear input fields
          email.current.value = "";
          password.current.value = "";
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          seterrorMassage(errorCode + " " + errorMessage);
          // Clear input fields on error
          email.current.value = "";
          password.current.value = "";
        });
    }
  };

  const toggle = () => {
    setIslogin(!Islogin);
    seterrorMassage(null); // Clear error message when toggling
  };

  const showPassword = () => {
    setisShowPassword(!isShowPassword);
  };

  return (
    <>
      <Header />
      <div className="relative top-[-115px]">
        <div className="absolute">
          <img src={background_URL} alt="" />
        </div>
        <div className="absolute w-full mt-20 flex justify-center">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              HanddlebtnClick();
            }}
            className="flex flex-col flex-wrap max-w-lg bg-[#000000c3] p-4 rounded-lg"
          >
            <h1 className="text-white font-bold text-4xl">
              {Islogin ? "Sign In" : "Sign Up"}
            </h1>
            {!Islogin && (
              <input
                ref={name}
                type="text"
                placeholder="Full Name"
                className="mt-4 p-2 rounded-md outline-none bg-gray-700 text-white"
              />
            )}
            <input
              ref={email}
              type="text"
              placeholder="Email Address"
              className="mt-4 p-2 rounded-md outline-none bg-gray-700 text-white"
            />
            <input
              ref={password}
              type={isShowPassword ? "text" : "password"}
              placeholder="Password"
              className="mt-4 p-2 rounded-md outline-none bg-gray-700 text-white"
            />
            <button
              type="submit"
              className="text-white mt-4 p-2 bg-red-700 rounded-md"
            >
              {Islogin ? "Sign In" : "Sign Up"}
            </button>
            <p className="mt-4 text-lg text-red-500">{errorMessage}</p>
            <label
              htmlFor="checkbox"
              className="text-white cursor-pointer mt-2"
            >
              <input
                id="checkbox"
                type="checkbox"
                className="mr-2 cursor-pointer"
                onClick={showPassword}
              />
              Show Password
            </label>
            <p
              className="text-white mt-4 font-bold cursor-pointer"
              onClick={toggle}
            >
              {Islogin
                ? "New To Netflix? Sign Up Now"
                : "Already Registered? Sign In Now"}
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
