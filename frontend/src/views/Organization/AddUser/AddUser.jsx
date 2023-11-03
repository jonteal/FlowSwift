import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../../context/context";
import { DynamicButton } from "../../../components/reusable/DynamicButton/DynamicButton";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../../../slices/usersApiSlice";
import FormContainer from "../../../components/FormContainer";
import { Form, Spinner } from "react-bootstrap";
import { GET_ORGANIZATIONS } from "../../../graphql/queries/organizationQueries";
import { useQuery } from "@apollo/client";
import { GET_USERS } from "../../../graphql/queries/userQueries";
// import { setCredentials } from "../../../slices/authSlice";

export const AddUser = () => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;

  const { userInfo } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("admin");
  // const [organizationId, setOrganizationId] = useState("");
  const [manager, setManager] = useState("");
  const [managerId, setManagerId] = useState("");

  const {
    loading: organizationsLoading,
    error: organizationsError,
    data: organizationsData,
    refetchOnMount,
  } = useQuery(GET_ORGANIZATIONS, {
    variables: { userId: userInfo._id },
  });

  const organizationId = organizationsData?.organizations[0].id;

  const {
    loading: usersLoading,
    error: usersError,
    data: usersData,
  } = useQuery(GET_USERS, {
    variables: { organizationId },
  });

  const [register, { isLoading }] = useRegisterMutation();

  if (usersLoading) return <Spinner />;
  if (usersError) return <p>There was an error...</p>;

  if (organizationsLoading) return <Spinner />;
  if (organizationsError) return <p>There was an error...</p>;

  const potentialManagers = usersData.users.filter(
    (user) =>
      user.role === "admin" || user.role === "manager" || user.role === "owner"
  );

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      // toast.error("Passwords do not match");
      console.log("passwords do not match");
    } else {
      try {
        register({
          name,
          email,
          password,
          role,
          organizationId,
          manager,
          managerId,
        }).unwrap();
        refetchOnMount;
      } catch (error) {
        // toast.error(err.data.message || err.error);
        console.log("Error: ", error);
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

        <label htmlFor="role" className="form-label mt-2">
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
          <option value="owner">Owner</option>
        </select>

        <label htmlFor="manager" className="form-label mt-2">
          Reports to
        </label>
        <select
          className="form-select"
          aria-label="Manager selection"
          id="manager"
          value={managerId}
          onChange={(e) => setManagerId(e.target.value)}
        >
          <option value="">N/A</option>
          {potentialManagers.map((user) => (
            <option key={user._id} value={user._id}>
              {user.name}
            </option>
          ))}
        </select>

        {isLoading && <Spinner />}

        <DynamicButton type="submit" color="red" className="mt-3">
          Add User
        </DynamicButton>
      </Form>
    </FormContainer>
  );
};
