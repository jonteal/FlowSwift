import { Link } from "react-router-dom";
import { MenuDrawer } from "../nav/MenuDrawer/MenuDrawer";
import { Toggle } from "../reusable/Toggle/Toggle";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../slices/usersApiSlice";
import { logout } from "../../slices/authSlice";
import { Notifications } from "../Notifications/Notifications";

// STATE
import { useSelector, useDispatch } from "react-redux";
import {
  setNotificationsOff,
  setNotificationsOn,
} from "../../slices/featuresSlice";

export const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const notifications = useSelector((state) => state.features.notifications);

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="flex flex-row justify-between bg-gradient-to-r from-sky-400 to-sky-600 px-20">
      <div className="w-48 bg-sky-700 pt-10 pb-2">
        <Link
          className="mx-3 flex-wrap flex text-2xl text-sky-100 font-bold italic"
          to={userInfo ? "/" : "/login"}
        >
          FlowSwift
        </Link>
      </div>
      <div>
        <Toggle />
      </div>

      {notifications && <Notifications />}

      <MenuDrawer />
    </div>
  );
};
