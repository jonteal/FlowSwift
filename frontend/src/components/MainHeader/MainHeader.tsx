import { Link } from "react-router-dom";
import { MenuDrawer } from "../nav/MenuDrawer";
import { Notifications } from "../Notifications/Notifications";
import { Toggle } from "../reusable/Toggle/Toggle";

// STATE
import { useAppSelector } from "../../store/hooks";
import { RootState } from "../../store/store";

export const MainHeader = () => {
  const { userInfo } = useAppSelector((state: RootState) => state.auth);

  const notifications = useAppSelector(
    (state: RootState) => state.features.notifications
  );

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
