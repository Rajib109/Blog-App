import { useDispatch } from "react-redux";
import { logout as storelogout } from "../../store/authSlice";
import authService from "../../appwrite/auth";

const Logout = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    authService.logout().then(() => {
      dispatch(storelogout());
    });
  };

  return (
    <button
      onClick={handleLogout}
      className="inline-block px-6 duration-200 hover:bg-blue-100 rounded-full"
    >
      Logout
    </button>
  );
};

export default Logout;
