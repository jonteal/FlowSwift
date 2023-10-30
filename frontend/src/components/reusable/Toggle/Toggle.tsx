import { useContext } from "react";
import { BsFillSunFill, BsMoonFill } from "react-icons/bs";
import { ThemeContext } from "../../../context";

export const Toggle = () => {
  const theme = useContext(ThemeContext);

  const handleClick = () => {
    theme.dispatch({ type: "TOGGLE" });
  };

  return (
    <div className="w-12 h-6 rounded-2xl border-slate-300 bg-slate-50 fixed top-10 left-3 z-10 flex items-center justify-around">
      <BsFillSunFill
        className={`w-4 h-4 ${
          theme.state.darkMode ? "hidden" : "z-10 text-sky-950 mr-6"
        }`}
      />
      <BsMoonFill
        className={`w-4 h-4 ${
          theme.state.darkMode ? "z-10 text-sky-950 ml-6" : "hidden"
        }`}
      />
      <div
        className="w-6 h-6 rounded-full bg-sky-800 absolute cursor-pointer flex flex-row items-center justify-between"
        onClick={handleClick}
        style={{ left: theme.state.darkMode ? 0 : 25 }}
      ></div>
    </div>
  );
};
