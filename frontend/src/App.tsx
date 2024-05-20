import { Outlet } from "react-router-dom";
import { MainHeader } from "./components/MainHeader/MainHeader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

export const App = () => (
  <div className="transform xl:translate-x-0 ease-in-out transition duration-500 max-h-max white text-slate-900">
    <MainHeader />
    <ToastContainer />
    <Outlet />
    {/* <Link to="/features">
        <SlFlag className="text-3xl text-red-500 bottom-0 fixed w-full h-10 right-0" />
      </Link> */}
  </div>
);
