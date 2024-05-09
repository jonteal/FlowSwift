import { NavLink } from "react-router-dom";

// ICONS
import { FaCreditCard, FaTable, FaWindowMaximize } from "react-icons/fa";
import { MdClose } from "react-icons/md";

// COMPONENTS
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";

// STATE
import { useState } from "react";
// import { useSelector } from "react-redux";
import { useAppSelector } from "../../../store/hooks";
import { RootState } from "../../../store/store";

export const ClientMobileMenu = () => {
  const { darkMode } = useAppSelector((state: RootState) => state.theme);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className={`${darkMode ? "bg-sky-950" : "bg-slate-50"}`}>
      <div className="flex flex-row justify-start">
        <Button
          variant="primary"
          className={`${
            darkMode
              ? "border-slate-50 text-slate-50"
              : "border-sky-900 text-sky-900"
          } text-3xl self-start ml-4 mb-3`}
          onClick={handleShow}
        >
          &#9776;
        </Button>
      </div>

      <Offcanvas
        className={`${darkMode ? "bg-sky-900" : "bg-slate-50"}`}
        show={show}
        onHide={handleClose}
        placement="top"
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
            onClick={handleClose}
            to="dashboard"
            className={`flex justify-start items-center space-x-6 ${
              darkMode
                ? "text-slate-50 focus:bg-sky-950 hover:text-slate-600 transition ease-in-out delay-50 duration-200"
                : "text-slate-600 focus:bg-sky-600 hover:text-white transition ease-in-out delay-50 duration-200"
            } focus:text-slate-100 hover:bg-sky-300 rounded px-3 py-3 w-full md:w-52`}
          >
            <FaWindowMaximize className=" text-indigo-500" />
            <p className="text-base leading-4">Dashboard</p>
          </NavLink>
          <NavLink
            onClick={handleClose}
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
            onClick={handleClose}
            to="billing"
            className={`flex justify-start items-center space-x-6 ${
              darkMode
                ? "text-slate-50 focus:bg-sky-950 hover:text-slate-600 transition ease-in-out delay-50 duration-200"
                : "text-slate-600 focus:bg-sky-600 hover:text-white transition ease-in-out delay-50 duration-200"
            }  focus:text-slate-100 hover:bg-sky-300 rounded px-3 py-3 w-full md:w-52`}
          >
            <FaCreditCard className="text-green-500" />
            <p className="text-base leading-4">Billing</p>
          </NavLink>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};
