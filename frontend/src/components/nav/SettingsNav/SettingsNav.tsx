import { NavLink } from "react-router-dom";
import { useState } from "react";

// ICONS
import { RiExpandLeftLine, RiExpandRightLine } from "react-icons/ri";
import { FaWindowMaximize } from "react-icons/fa";

// STATE
import { useAppSelector } from "../../../store/hooks";
import { RootState } from "../../../store/store";

export const SettingsNav = () => {
  const { darkMode } = useAppSelector((state: RootState) => state.theme);

  const [isOpen, setIsOpen] = useState(true);

  const handleNavCollapse = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div
      id="Main"
      className={`transform xl:translate-x-0 ease-in-out transition duration-500 flex justify-start items-start h-screen border w-full ${
        darkMode ? "bg-sky-800" : "bg-slate-50"
      }  flex-col ml-2 rounded-xl ${!isOpen ? "sm:w-10" : "sm:w-64"}`}
    >
      <div
        onClick={handleNavCollapse}
        className={`${
          !isOpen ? "block" : "hidden"
        } w-full flex flex-row justify-center`}
      >
        <RiExpandRightLine
          className={`mt-2 text-lg ${
            darkMode ? "text-slate-50" : "text-slate-800"
          }`}
        />
      </div>
      <div
        className={`flex flex-col justify-start items-center px-6 w-full ${
          !isOpen ? "hidden" : ""
        }`}
      >
        <div
          id="menu1"
          className="flex justify-start flex-col w-full md:w-auto items-start pb-1 "
        >
          <div className="flex flex-row w-full justify-end">
            <RiExpandLeftLine
              onClick={handleNavCollapse}
              className={`mt-2 text-lg   ${
                darkMode ? "text-slate-50" : "text-slate-800"
              }`}
            />
          </div>
          <NavLink
            to="profile"
            className={`flex justify-start items-center space-x-6 ${
              darkMode
                ? "text-slate-50 focus:bg-sky-950 hover:text-slate-600 transition ease-in-out delay-50 duration-200"
                : "text-slate-600 focus:bg-sky-600 hover:text-white transition ease-in-out delay-50 duration-200"
            } focus:text-slate-100 hover:bg-sky-300 rounded px-3 py-3 w-full md:w-52`}
          >
            <FaWindowMaximize className=" text-indigo-500" />
            <p className="text-base leading-4">Profile</p>
          </NavLink>
          {/* <NavLink
            to="projects"
            className={`flex justify-start items-center space-x-6 ${
              darkMode
                ? "text-slate-50 focus:bg-sky-950 hover:text-slate-600 transition ease-in-out delay-50 duration-200"
                : "text-slate-600 focus:bg-sky-600 hover:text-white transition ease-in-out delay-50 duration-200"
            }  focus:text-slate-100 hover:bg-sky-300 rounded px-3 py-3 w-full md:w-52`}
          >
            <FaTable className="text-rose-500" />
            <p className="text-base leading-4">Projects</p>
          </NavLink>
          <NavLink
            to="billing"
            className={`flex justify-start items-center space-x-6 ${
              darkMode
                ? "text-slate-50 focus:bg-sky-950 hover:text-slate-600 transition ease-in-out delay-50 duration-200"
                : "text-slate-600 focus:bg-sky-600 hover:text-white transition ease-in-out delay-50 duration-200"
            }  focus:text-slate-100 hover:bg-sky-300 rounded px-3 py-3 w-full md:w-52`}
          >
            <FaCreditCard className="text-green-500" />
            <p className="text-base leading-4">Billing</p>
          </NavLink> */}
        </div>
      </div>
    </div>
  );
};
