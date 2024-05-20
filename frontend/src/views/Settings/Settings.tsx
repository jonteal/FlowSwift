import { SettingsNav } from "../../components/nav/SettingsNav";
import { Outlet } from "react-router-dom";

// state
import { useAppSelector } from "../../store/hooks";
import { RootState } from "../../store/store";

export const Settings = () => {
  const { userInfo } = useAppSelector((state: RootState) => state.auth);

  return (
    <div className="w-full h-auto min-h-full mt-4 rounded-md flex flex-row">
      <SettingsNav />
      <Outlet />
    </div>
  );
};
