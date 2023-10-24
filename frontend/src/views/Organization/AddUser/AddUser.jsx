import { useEffect, useState } from "react";
import { DynamicButton } from "../../../components/reusable/DynamicButton/DynamicButton";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../../../slices/usersApiSlice";
import FormContainer from "../../../components/FormContainer";
import { Form } from "react-bootstrap";

export const AddUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("admin");
  const [organization, setOrganization] = useState("");
  const [manager, setManager] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    setOrganization(userInfo?.organization);
  });

  console.log("organization: ", organization);

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
          organization,
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
        <Form.Group className="my-2" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="confirm-password">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        {/* <Form.Group className="my-2" controlId="organization">
          <Form.Label>Organization</Form.Label>
          <Form.Control
            type="text"
            placeholder="Organization name"
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
          ></Form.Control>
        </Form.Group> */}

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

        {isLoading && <Loader />}

        <DynamicButton type="submit" color="red" className="mt-3">
          Add User
        </DynamicButton>
      </Form>
    </FormContainer>
  );
};
