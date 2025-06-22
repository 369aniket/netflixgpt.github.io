import { logo_URL } from "../utils/links";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((store) => store.user);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => navigate("/"))
      .catch((error) => {
        console.error("Sign-out error:", error.message);
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL }));
        if (location.pathname !== "/browse") {
          navigate("/browse");
        }
      } else {
        dispatch(removeUser());
        if (location.pathname !== "/") {
          navigate("/");
        }
      }
    });
    return () => unsubscribe();
  }, [dispatch, navigate, location.pathname]);

  const isLoginPage = location.pathname === "/";

  return (
    <header className="fixed top-0 left-0 w-full z-20 bg-gradient-to-b from-black/90 via-black/60 to-transparent px-4 py-3 flex justify-between items-center">
      <img src={logo_URL} alt="Logo" className="w-32 md:w-44" />
      {!isLoginPage && user && (
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
            <img src={user.photoURL} alt="User Avatar" className="w-full h-full object-cover" />
          </div>
          <span className="text-white font-medium hidden sm:block">{user.displayName}</span>
          <button
            onClick={handleSignOut}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm"
          >
            Sign Out
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;

