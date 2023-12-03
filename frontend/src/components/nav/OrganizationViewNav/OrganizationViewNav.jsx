import { NavLink } from "react-router-dom";

// ICONS
import { BsFillPersonVcardFill, BsPersonCircle } from "react-icons/bs";
import { GiMoneyStack } from "react-icons/gi";
import { PiKanbanLight } from "react-icons/pi";
import { FaProjectDiagram } from "react-icons/fa";

// STATE
import { useSelector } from "react-redux";

export const OrganizationViewNav = () => {
  const { darkMode } = useSelector((state) => state.theme);

  return (
    <div
      id="Main"
      className={`transform xl:translate-x-0 ease-in-out transition duration-500 flex justify-start items-start h-10 border w-full ${
        darkMode ? "bg-sky-800" : "bg-slate-50"
      } flex-row pr-10`}
    >
      <div className="flex flex-row justify-center items-center px-6 w-full">
        <div
          id="menu1"
          className="flex flex-row w-full md:w-auto justify-start pb-1 "
        >
          <NavLink
            to="profile"
            className={`flex justify-start items-center space-x-2 ${
              darkMode
                ? "text-slate-50 focus:bg-sky-950 hover:bg-sky-300 hover:text-slate-600 transition ease-in-out delay-50 duration-200"
                : "text-slate-600 focus:bg-sky-600 hover:text-white hover:bg-sky-300 transition ease-in-out delay-50 duration-200"
            } rounded my-1 px-3 py-2 w-full md:w-30`}
          >
            <BsFillPersonVcardFill className="text-lime-500" />
            <p className="text-base leading-4">Organization</p>
          </NavLink>
          <NavLink
            to="clients"
            className={`flex justify-start items-center space-x-2 ${
              darkMode
                ? "text-slate-50 focus:bg-sky-950 hover:bg-sky-300 hover:text-slate-600 transition ease-in-out delay-50 duration-200"
                : "text-slate-600 focus:bg-sky-600 hover:text-white hover:bg-sky-300 transition ease-in-out delay-50 duration-200"
            } rounded my-1 px-3 py-2 w-full md:w-30`}
          >
            <BsPersonCircle className="text-rose-500" />
            <p className="text-base leading-4">Clients</p>
          </NavLink>
          <NavLink
            to="projects"
            className={`flex justify-start items-center space-x-2 ${
              darkMode
                ? "text-slate-50 focus:bg-sky-950 hover:bg-sky-300 hover:text-slate-600 transition ease-in-out delay-50 duration-200"
                : "text-slate-600 focus:bg-sky-600 hover:text-white hover:bg-sky-300 transition ease-in-out delay-50 duration-200"
            } rounded my-1 px-3 py-2 w-full md:w-30`}
          >
            <FaProjectDiagram className="text-orange-500" />
            <p className="text-base leading-4">Projects</p>
          </NavLink>
          <NavLink
            to="financials"
            className={`flex justify-start items-center space-x-2 ${
              darkMode
                ? "text-slate-50 focus:bg-sky-950 hover:bg-sky-300 hover:text-slate-600 transition ease-in-out delay-50 duration-200"
                : "text-slate-600 focus:bg-sky-600 hover:text-white hover:bg-sky-300 transition ease-in-out delay-50 duration-200"
            } rounded my-1 px-3 py-2 w-full md:w-30`}
          >
            <GiMoneyStack className="text-green-500" />
            <p className="text-base leading-4">Financials</p>
          </NavLink>
          <NavLink
            to="kanbans"
            className={`flex justify-start items-center space-x-2 ${
              darkMode
                ? "text-slate-50 focus:bg-sky-950 focus:text-slate-50 hover:bg-sky-300 transition ease-in-out delay-50 duration-200"
                : "text-slate-600 focus:bg-sky-600 hover:text-white hover:bg-sky-300 transition ease-in-out delay-50 duration-200"
            } rounded my-1 px-3 py-2 w-full md:w-30`}
          >
            <PiKanbanLight className="text-purple-500" />
            <p className="text-base leading-4">Kanbans</p>
          </NavLink>
        </div>
      </div>
    </div>
  );
};
