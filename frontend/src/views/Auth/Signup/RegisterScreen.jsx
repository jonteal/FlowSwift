import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

// COMPONENTS
import { Form, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import FormContainer from "../../../components/FormContainer";
import Loader from "../../../components/Loader";
import { DynamicButton } from "../../../components/reusable/DynamicButton/DynamicButton";

// REDUX
import { useRegisterMutation } from "../../../slices/usersApiSlice";
import { setCredentials } from "../../../slices/authSlice";

export const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("owner");
  const [organization, setOrganization] = useState(undefined);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

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
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate("/");
      } catch (error) {
        toast.error(err.data.message || err.error);
      }
    }
  };
  return (
    <FormContainer className="max-h-max">
      <h1>Sign Up</h1>
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

        {/* TODO: maybe add this back in when I have a better architecture pattern */}
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

        <DynamicButton type="submit" color="red" className="my-3">
          Sign Up
        </DynamicButton>

        <Row>
          <Col>
            Already have an account?
            <DynamicButton className="mt-3" type="link" link="/login">
              Login
            </DynamicButton>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
};
