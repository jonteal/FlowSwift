import { Link } from "react-router-dom";
import { MenuDrawer } from "../nav/MenuDrawer/MenuDrawer";
import { Toggle } from "../reusable/Toggle/Toggle";
import { Navbar, Nav, Container, NavDropdown, Badge } from "react-bootstrap";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../slices/usersApiSlice";
import { logout } from "../../slices/authSlice";
import { DropdownComponent } from "../reusable/DropdownComponent/DropdownComponent";

export const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);

  console.log("userInfo: ", userInfo);

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
    <div className="flex flex-row justify-between bg-gradient-to-r from-sky-400 to-sky-600 px-20">
      <div className="w-48 bg-sky-700 pt-10 pb-2">
        <Link
          className="mx-3 flex-wrap flex text-2xl text-zinc-100 font-bold italic"
          to={userInfo ? "/clients" : "/login"}
        >
          FlowSwift
        </Link>
      </div>
      <div>
        <Toggle />
      </div>
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {userInfo ? (
              <>
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <Nav>
                <LinkContainer to="login">
                  <Nav.Link>
                    <FaSignInAlt /> Sign In
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Nav.Link>
                    <FaSignInAlt /> Sign Up
                  </Nav.Link>
                </LinkContainer>
              </Nav>
            )}
          </Nav>
          <Nav className="ms-auto"></Nav>
        </Navbar.Collapse>
      </Container>

      <MenuDrawer placement="end" />
    </div>
  );
};
