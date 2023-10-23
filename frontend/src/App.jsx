import { Outlet } from "react-router-dom";
import { Navigation } from "./components/Navigation/Navigation";
import { ToastContainer } from "react-toastify";
import { useContext } from "react";
import { ThemeContext } from "./context";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

export const App = () => {
  return (
    <>
      <Navigation />
      {/* <ToastContainer /> */}
      <Outlet />
    </>
  );
};
