import { Fragment, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../slices/authSlice";
import { useLogoutMutation } from "../../../slices/usersApiSlice";

export const MenuDrawer = ({ name, ...props }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

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
          {userInfo ? (
            <Fragment>
              <div className="nav-links flex flex-col">
                <Link
                  onClick={handleClose}
                  className="nav-link mx-3 text-zinc-100 font-normal text-2xl my-2"
                  to="/"
                >
                  Home
                </Link>
                <Link
                  onClick={handleClose}
                  className="nav-link mx-3 text-zinc-100 font-normal text-2xl my-2"
                  to="dashboard"
                >
                  My Dashboard
                </Link>
                {/* <Link
                  onClick={handleClose}
                  className="nav-link mx-3 text-zinc-100 font-normal text-2xl my-2"
                  to={`/organizations/${organization.id}/clients`}
                >
                  Clients
                </Link> */}
                <Link
                  onClick={handleClose}
                  className="nav-link mx-3 text-zinc-100 font-normal text-2xl my-2"
                  to="projects"
                >
                  Projects
                </Link>
                <Link
                  onClick={handleClose}
                  className="nav-link mx-3 text-zinc-100 font-normal text-2xl my-2"
                  to="settings"
                >
                  Settings
                </Link>
                <button
                  className="nav-link mx-3 text-zinc-100 font-normal text-2xl my-2 self-start"
                  onClick={logoutHandler}
                >
                  Sign Out
                </button>
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <Link
                className="nav-link mx-3 text-zinc-100 font-normal text-2xl my-2"
                to="login"
              >
                Sign In
              </Link>
              <Link
                className="nav-link mx-3 text-zinc-100 font-normal text-2xl my-2"
                to="/register"
              >
                Sign Up
              </Link>
            </Fragment>
          )}

          <Fragment></Fragment>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
