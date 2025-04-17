import { logo_URL } from "../utils/links";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Header = () => {
  const navigate = useNavigate();
  const user = useSelector( store =>store.user)
  const handdleSingOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };
  return (
    <div className="relative px-8 py-2 z-10 bg-gradient-to-b from-black flex justify-between">
      <img src={logo_URL} alt="Logo" className="w-2/12 " />
      {
        (user && <div className=" p-4 flex ">
          <div className="w-14 h-14 rounded-full overflow-hidden" >
            <img src={user?.photoURL} alt="User Image" />
          </div>
          <h1 className="text-white font-bold p-4">{user.displayName}</h1>
          <button
            onClick={handdleSingOut}
            className="w-20 h-8 bg-red-700 text-white rounded-md ml-5"
          >
            Sign Out
          </button>
        </div>)
      }
    </div>
  );
};

export default Header;
