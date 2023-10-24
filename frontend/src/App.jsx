import { Outlet } from "react-router-dom";
import { Navigation } from "./components/Navigation/Navigation";
import { ToastContainer } from "react-toastify";
import { useContext } from "react";
import { ThemeContext } from "./context";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

export const App = () => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;
  return (
    <div
      className={`transform xl:translate-x-0 ease-in-out transition duration-500 ${
        darkMode ? "bg-sky-950 max-h-max	" : "white"
      } ${darkMode ? "text-sky-50" : "text-slate-900"}`}
    >
      <Navigation />
      <ToastContainer />
      <Outlet />
    </div>
  );
};
