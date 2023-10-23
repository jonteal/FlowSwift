import { useSelector } from "react-redux";
import { SettingsNav } from "../../components/nav/SettingsNav/SettingsNav";
import { Outlet } from "react-router-dom";

export const Settings = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div className="w-full h-auto min-h-full mt-4 rounded-md flex flex-row">
      <SettingsNav />
      <Outlet />
    </div>
  );
};
