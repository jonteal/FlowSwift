import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../../context";
import { DynamicButton } from "../../../components/reusable/DynamicButton/DynamicButton";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../../../slices/usersApiSlice";
import FormContainer from "../../../components/FormContainer";
import { Form, Spinner } from "react-bootstrap";
import { GET_ORGANIZATIONS } from "../../../graphql/queries/organizationQueries";
import { useQuery } from "@apollo/client";
import { GET_USERS } from "../../../graphql/queries/userQueries";

export const AddUser = () => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  const { userInfo } = useSelector((state) => state.auth);

  const {
    loading: organizationsLoading,
    error: organizationsError,
    data: organizationsData,
  } = useQuery(GET_ORGANIZATIONS, {
    variables: { userId: userInfo._id },
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [organizationId, setOrganizationId] = useState(
    organizationsData?.organizations[0].id
  );
  const [manager, setManager] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [register, { isLoading }] = useRegisterMutation();

  const {
    loading: usersLoading,
    error: usersError,
    data: usersData,
  } = useQuery(GET_USERS, {
    variables: { organizationId },
  });

  if (usersLoading) return <Spinner />;
  if (usersError) return <p>There was an error...</p>;

  if (organizationsLoading) return <Spinner />;
  if (organizationsError) return <p>There was an error...</p>;

  console.log("usersData: ", usersData);

  // TODO: how to add manager options
  // create a query to fetch users by organization
  // filter the list by members with the manager role

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register({
          name,
          email,
          password,
          role,
          organizationId,
          manager,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate("/");
      } catch (error) {
        toast.error(err.data.message || err.error);
      }
    }
  };
  return (
    <FormContainer>
      <h1>Add User</h1>
      <Form onSubmit={submitHandler}>
        <div className="mb-3">
          <label htmlFor="employee-name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="employee-name"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="employee-email" className="form-label">
            Email Address
          </label>
          <input
            type="email"
            className="form-control"
            id="employee-email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="employee-password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="employee-password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="employee-confirm-password" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="employee-confirm-password"
            placeholder="Enter Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <label htmlFor="role" className="form-label mt-8">
          Role
        </label>
        <select
          className="form-select"
          aria-label="Role selection"
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="admin">Admin</option>
          <option value="manager">Manager</option>
          <option value="employee">Employee</option>
        </select>

        {isLoading && <Spinner />}

        <DynamicButton type="submit" color="red" className="mt-3">
          Add User
        </DynamicButton>
      </Form>
    </FormContainer>
  );
};
