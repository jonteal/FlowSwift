import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { FaCreditCard, FaTable, FaWindowMaximize } from "react-icons/fa";
import { MdClose, MdElectricalServices } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../../../context";
import { BsActivity, BsFillPersonVcardFill } from "react-icons/bs";
import { GiMoneyStack } from "react-icons/gi";
import { PiKanbanLight } from "react-icons/pi";

export const ProjectMobileMenu = () => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className={`${darkMode ? "bg-sky-950" : "bg-slate-50"}`}>
      <div className="flex flex-row justify-end">
        <Button
          variant="primary"
          className={`${
            darkMode
              ? "border-slate-50 text-slate-50"
              : "border-sky-900 text-sky-900"
          } text-base self-start ml-4 mb-3`}
          onClick={handleShow}
        >
          Project Menu
        </Button>
      </div>

      <Offcanvas
        className={`${darkMode ? "bg-sky-900" : "bg-slate-50"}`}
        show={show}
        onHide={handleClose}
        placement="start"
      >
        <Offcanvas.Header>
          <Offcanvas.Title
            className={`${darkMode ? "text-slate-50" : "text-sky-900"}`}
          >
            Client
          </Offcanvas.Title>
          <MdClose
            onClick={handleClose}
            className={`${
              darkMode ? "text-slate-50" : "text-sky-900"
            } text-3xl`}
          />
        </Offcanvas.Header>
        <Offcanvas.Body>
          <NavLink
            to="profile"
            onClick={handleClose}
            className={`flex justify-start items-center space-x-6 ${
              darkMode
                ? "text-slate-50 focus:bg-sky-950 hover:text-slate-600 transition ease-in-out delay-50 duration-200"
                : "text-slate-600 focus:bg-sky-600 hover:text-white transition ease-in-out delay-50 duration-200"
            } focus:text-slate-100 hover:bg-sky-300 rounded px-3 py-3 w-full md:w-52`}
          >
            <BsFillPersonVcardFill className="text-lime-500" />
            <p className="text-base leading-4">Profile</p>
          </NavLink>
          <NavLink
            to="services"
            onClick={handleClose}
            className={`flex justify-start items-center space-x-6 ${
              darkMode
                ? "text-slate-50 focus:bg-sky-950 hover:text-slate-600 transition ease-in-out delay-50 duration-200"
                : "text-slate-600 focus:bg-sky-600 hover:text-white transition ease-in-out delay-50 duration-200"
            } focus:text-slate-100 hover:bg-sky-300 rounded px-3 py-3 w-full md:w-52`}
          >
            <MdElectricalServices className="text-rose-500" />
            <p className="text-base leading-4">Services</p>
          </NavLink>
          <NavLink
            to="activity"
            onClick={handleClose}
            className={`flex justify-start items-center space-x-6 ${
              darkMode
                ? "text-slate-50 focus:bg-sky-950 hover:text-slate-600 transition ease-in-out delay-50 duration-200"
                : "text-slate-600 focus:bg-sky-600 hover:text-white transition ease-in-out delay-50 duration-200"
            } focus:text-slate-100 hover:bg-sky-300 rounded px-3 py-3 w-full md:w-52`}
          >
            <BsActivity className="text-orange-500" />
            <p className="text-base leading-4">Activity</p>
          </NavLink>
          <NavLink
            to="financials"
            onClick={handleClose}
            className={`flex justify-start items-center space-x-6 ${
              darkMode
                ? "text-slate-50 focus:bg-sky-950 hover:text-slate-600 transition ease-in-out delay-50 duration-200"
                : "text-slate-600 focus:bg-sky-600 hover:text-white transition ease-in-out delay-50 duration-200"
            } focus:text-slate-100 hover:bg-sky-300 rounded px-3 py-3 w-full md:w-52`}
          >
            <GiMoneyStack className="text-green-500" />
            <p className="text-base leading-4">Financials</p>
          </NavLink>
          <NavLink
            to="kanbans"
            onClick={handleClose}
            className={`flex justify-start items-center space-x-6 ${
              darkMode
                ? "text-slate-50 focus:bg-sky-950 hover:text-slate-600 transition ease-in-out delay-50 duration-200"
                : "text-slate-600 focus:bg-sky-600 hover:text-white transition ease-in-out delay-50 duration-200"
            } focus:text-slate-100 hover:bg-sky-300 rounded px-3 py-3 w-full md:w-52`}
          >
            <PiKanbanLight className="text-purple-500" />
            <p className="text-base leading-4">Kanbans</p>
          </NavLink>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};
