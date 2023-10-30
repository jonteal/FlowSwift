import { Link, Outlet } from "react-router-dom";
import { Navigation } from "./components/Navigation/Navigation";
import { SlFlag } from "react-icons/sl";
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
      <Link to="/features">
        <SlFlag className="text-3xl text-red-500 bottom-0 fixed w-full h-10 right-0" />
      </Link>
    </div>
  );
};
