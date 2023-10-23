import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import Offcanvas from "react-bootstrap/Offcanvas";

export const MenuDrawer = ({ name, ...props }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button
        onClick={handleShow}
        className="me-2 text-5xl text-zinc-100 sticky"
      >
        &#9776;
      </button>
      <Offcanvas
        show={show}
        onHide={handleClose}
        {...props}
        className="canvas-drawer bg-sky-400"
      >
        <Offcanvas.Header
          className="text-zinc-100"
          closeButton
        ></Offcanvas.Header>
        <Offcanvas.Body>
          <Fragment>
            <div className="nav-links flex flex-col">
              <Link
                className="nav-link mx-3 text-zinc-100 font-normal text-2xl my-2"
                to="/"
              >
                Home
              </Link>
              <Link
                className="nav-link mx-3 text-zinc-100 font-normal text-2xl my-2"
                to="dashboard"
              >
                My Dashboard
              </Link>
              <Link
                className="nav-link mx-3 text-zinc-100 font-normal text-2xl my-2"
                to="clients"
              >
                Clients
              </Link>
              <Link
                className="nav-link mx-3 text-zinc-100 font-normal text-2xl my-2"
                to="projects"
              >
                Projects
              </Link>
              <Link
                className="nav-link mx-3 text-zinc-100 font-normal text-2xl my-2"
                to="projects"
              >
                Settings
              </Link>
            </div>
          </Fragment>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
