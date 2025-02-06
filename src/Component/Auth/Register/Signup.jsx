import axios from "axios";
import React, { useState } from "react";
import { Form, Button, Card, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorBundles, setErrorBundles] = useState({})
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    let userCredentials = {
      name: name,
      email: email,
      password: password,
      password_confirmation: confirmPassword
    }
    console.log(userCredentials)
    axios.post(`${BASE_URL}/auth/register`, userCredentials)
      .then((res) => {
        toast.success(`User Created Successful, Please do login`, {
          position: "top-right",
          hideProgressBar: false,
          autoClose: 2500,
          theme: "colored",
        });
        setTimeout(() => {
          navigate("/"); // Redirect to login page
        }, 3000); // Delay for toast notification
      })
      .catch((err) => {
        setErrorBundles(err?.response?.data?.errors)
        toast.error(`${err?.response?.data?.message}`, {
          position: "top-right",
          hideProgressBar: false,
          autoClose: 2500,
          theme: "colored",

        });

        console.error("Registration error:", errorBundles);
      });
  };
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Card className="p-4 shadow-sm" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center">Signup</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Full Name<b className="text-danger">*</b></Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            {errorBundles['name'] && <p className="text-danger">*{errorBundles['name']}</p>}
          </Form.Group>

          <Form.Group controlId="email" className="mt-3">
            <Form.Label>Email address<b className="text-danger">*</b></Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {errorBundles['email'] && <p className="text-danger">*{errorBundles['email']}</p>}
          </Form.Group>

          <Form.Group controlId="password" className="mt-3">
            <Form.Label>Password<b className="text-danger">*</b></Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {errorBundles['password'] && <p className="text-danger">*{errorBundles['password']}</p>}
          </Form.Group>
          <Form.Group controlId="password" className="mt-3">
            <Form.Label>Confirm Password<b className="text-danger">*</b></Form.Label>
            <Form.Control
              type="password"
              placeholder="Re-type Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {errorBundles['password'] && <p className="text-danger">*{errorBundles['password']}</p>}
          </Form.Group>

          <Button variant="success" type="submit" className="mt-3 w-100">
            Register
          </Button>
          <div className="text-center mt-3">
            <p>Already have an account? <a href="/" className="text-info">Login</a></p>
          </div>
        </Form>
        <Row className="align-items-center my-1">
          <Col><hr /></Col>
          <Col xs="auto" className="text-muted">Or</Col>
          <Col><hr /></Col>
        </Row>
        <Row className="align-items-center m-0 p-0">
          <Button variant="none" className='btn btn-outline-info w-100'>
            Login with Google
          </Button>
        </Row>
      </Card>
    </div>
  );
};

export default Signup;
