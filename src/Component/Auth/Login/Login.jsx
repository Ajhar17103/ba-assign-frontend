import React, { useState } from "react";
import { Form, Button, Card, Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
	const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
  
	const handleSubmit = (e) => {
	  e.preventDefault();
	  let userCredentials={
		email:email,
		password:password,
	  }
	  console.log(userCredentials)
	  axios.post(`${BASE_URL}/auth/login`, userCredentials)
	  .then((res)=>{
		 toast.success(`Successfully Login,Redirect Home Page`, {
		  position: "top-right",
		  hideProgressBar: false,
		  autoClose: 2500,
		  theme: "colored",
		});
		console.log(res?.data?.access_token)
		localStorage.setItem('access_token',res?.data?.access_token)
		localStorage.setItem('expires_in',res?.data?.expires_in)
		setTimeout(() => {
		  window.location.reload(); // Redirect to login page
		}, 3000); // Delay for toast notification
	  })
	  .catch((err)=>{
		toast.error(`${err?.response?.data?.error}`, {
		  position: "top-right",
		  hideProgressBar: false,
		  autoClose: 2500,
		  theme: "colored",
  
		});
  
		console.error("Registration error:",errorBundles);
	  });
	};

  return (
	<div className="d-flex justify-content-center align-items-center vh-100">
	<Card className="p-4 shadow-sm" style={{ maxWidth: "400px", width: "100%" }}>
	  <h2 className="text-center">Login</h2>
	  <Form onSubmit={handleSubmit}>
		<Form.Group controlId="email">
		  <Form.Label>Email address</Form.Label>
		  <Form.Control
			type="email"
			placeholder="Enter email"
			value={email}
			onChange={(e) => setEmail(e.target.value)}
			required
		  />
		</Form.Group>

		<Form.Group controlId="password" className="mt-3">
		  <Form.Label>Password</Form.Label>
		  <Form.Control
			type="password"
			placeholder="Password"
			value={password}
			onChange={(e) => setPassword(e.target.value)}
			required
		  />
		</Form.Group>

		<Button variant="primary" type="submit" className="mt-3 w-100">
		  Login
		</Button>
          <div className="text-center mt-3">
            <p>Don't have an account? <a href="/sign-up" className="text-info">Signup</a></p>
          </div>
	  </Form>
	  <Row className="align-items-center my-1">
      <Col><hr /></Col>
      <Col xs="auto" className="text-muted">Or</Col>
      <Col><hr /></Col>
    </Row>
    <Row className="align-items-center m-0 p-0">
      <Button variant="none"  className='btn btn-outline-info w-100'>
          Login with Google
      </Button>
    </Row>
	</Card>
  </div>
  );
};

export default Login;
