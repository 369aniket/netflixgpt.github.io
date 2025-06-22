import Header from "./Header";
import Accordian from "./accordion/Accordian";
import Footer from "./Footer";
import { useState, useRef, useEffect } from "react";
import { background_URL } from "../utils/links";
import { checkvalidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({ uid, email, displayName, photoURL })
        );
        navigate("/browse");
      }
    });
    return () => unsubscribe();
  }, [dispatch, navigate]);

  const handleBtnClick = () => {
    const message = checkvalidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;

    if (!isLogin) {
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: "https://avatars.githubusercontent.com/u/150271298?v=4",
          }).then(() => {
            const { uid, email, displayName, photoURL } = auth.currentUser;
            dispatch(addUser({ uid, email, displayName, photoURL }));
            name.current.value = "";
            email.current.value = "";
            password.current.value = "";
            navigate("/browse");
          });
        })
        .catch((error) => {
          setErrorMessage(`${error.code} ${error.message}`);
          name.current.value = "";
          email.current.value = "";
          password.current.value = "";
        });
    } else {
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then(() => {
          email.current.value = "";
          password.current.value = "";
          navigate("/browse");
        })
        .catch((error) => {
          setErrorMessage(`${error.code} ${error.message}`);
          email.current.value = "";
          password.current.value = "";
        });
    }
  };

  const toggle = () => {
    setIsLogin(!isLogin);
    setErrorMessage(null);
  };

  const showPassword = () => setIsShowPassword(!isShowPassword);

  return (
    <>
      <Header />
      <div className="relative h-screen w-full">
        <img
          src={background_URL}
          alt="Background"
          className="absolute h-full w-full object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-60 flex justify-center items-center">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleBtnClick();
            }}
            className="flex flex-col w-full max-w-md bg-black bg-opacity-80 p-6 rounded-md"
          >
            <h1 className="text-white text-3xl font-bold mb-6">
              {isLogin ? "Sign In" : "Sign Up"}
            </h1>
            {!isLogin && (
              <input
                ref={name}
                type="text"
                placeholder="Full Name"
                className="mb-4 p-3 rounded-md bg-gray-700 text-white"
              />
            )}
            <input
              ref={email}
              type="text"
              placeholder="Email Address"
              className="mb-4 p-3 rounded-md bg-gray-700 text-white"
            />
            <input
              ref={password}
              type={isShowPassword ? "text" : "password"}
              placeholder="Password"
              className="mb-4 p-3 rounded-md bg-gray-700 text-white"
            />
            <label className="text-white mb-4 cursor-pointer">
              <input
                type="checkbox"
                className="mr-2"
                onClick={showPassword}
              />
              Show Password
            </label>
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-md"
            >
              {isLogin ? "Sign In" : "Sign Up"}
            </button>
            <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
            <p
              onClick={toggle}
              className="text-white mt-4 cursor-pointer hover:underline"
            >
              {isLogin
                ? "New to Netflix? Sign Up Now"
                : "Already Registered? Sign In Now"}
            </p>
          </form>
        </div>
      </div>
      <div className="bg-black text-white py-12">
        <div className="max-w-5xl mx-auto">
          <Accordian
            data={[
              {
                id: 1,
                question: "What is Netflix GPT?",
                answer: "Netflix GPT is a clone built for learning and exploration."
              },
              {
                id: 2,
                question: "Is this free to use?",
                answer: "Yes, it's entirely for educational and demo purposes."
              }
            ]}
          />
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Login;
