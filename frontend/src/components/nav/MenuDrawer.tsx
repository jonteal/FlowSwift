import { Sheet, SheetContent, SheetTrigger } from "../../@/components/ui/sheet";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../slices/usersApiSlice";
import { logout } from "../../slices/authSlice";

import { RootState } from "../../store/store";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

export const MenuDrawer = () => {
  const { userInfo } = useAppSelector((state: RootState) => state.auth);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      // @ts-ignore
      await logoutApiCall().unwrap();
      // @ts-ignore
      dispatch(logout());
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Sheet>
      {/* <SheetTrigger>&#9776;</SheetTrigger> */}
      <SheetContent>
        {userInfo ? (
          <>
            <div className="nav-links flex flex-col">
              <Link
                // onClick={handleClose}
                className="nav-link mx-3 text-zinc-100 font-normal text-2xl my-2"
                to="/"
              >
                Home
              </Link>
              <Link
                // onClick={handleClose}
                className="nav-link mx-3 text-zinc-100 font-normal text-2xl my-2"
                to="dashboard"
              >
                My Dashboard
              </Link>
              {/* <Link
                  // onClick={handleClose}
                  className="nav-link mx-3 text-zinc-100 font-normal text-2xl my-2"
                  to={`/organizations/${organization.id}/clients`}
                >
                  Clients
                </Link> */}
              <Link
                // onClick={handleClose}
                className="nav-link mx-3 text-zinc-100 font-normal text-2xl my-2"
                to="projects"
              >
                Projects
              </Link>
              <Link
                // onClick={handleClose}
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
          </>
        ) : (
          <>
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
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};
