// ICONS
import { BsFillSunFill, BsMoonFill } from "react-icons/bs";

// STATE
import { setDarkModeOff, setDarkModeOn } from "../../../slices/themeSlice";
import { useDispatch, useSelector } from "react-redux";

export const Toggle = () => {
  const dispatch = useDispatch();

  const { darkMode } = useSelector((state) => state.theme);

  const handleThemeToggle = () => {
    darkMode ? dispatch(setDarkModeOff()) : dispatch(setDarkModeOn());
  };

  return (
    <div className="w-12 h-6 rounded-2xl border-slate-300 bg-slate-50 fixed top-10 left-3 z-10 flex items-center justify-around">
      <BsFillSunFill
        className={`w-4 h-4 ${darkMode ? "hidden" : "z-10 text-sky-950 mr-6"}`}
      />
      <BsMoonFill
        className={`w-4 h-4 ${darkMode ? "z-10 text-sky-950 ml-6" : "hidden"}`}
      />
      <div
        className="w-6 h-6 rounded-full bg-sky-800 absolute cursor-pointer flex flex-row items-center justify-between"
        onClick={handleThemeToggle}
        style={{ left: darkMode ? 0 : 25 }}
      ></div>
    </div>
  );
};
