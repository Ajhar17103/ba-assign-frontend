import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstance from "../../Services/Interceptor";

const NavigationBar = () => {
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
  const location = useLocation();

  const handleLogout = () => {
    axiosInstance.post(`${BASE_URL}/logout`,)
    .then((res)=>{
       toast.warning(`Successfully logout,Redirect to login Page`, {
        position: "top-right",
        hideProgressBar: false,
        autoClose: 2500,
        theme: "colored",
      });
      console.log(res?.data?.access_token)
      localStorage.removeItem('access_token')
      localStorage.removeItem('expires_in')
      setTimeout(() => {
        window.location.reload(); // Redirect to login page
      }, 3000); // Delay for toast notification
    })
    .catch((err)=>{
      toast.error(`${err?.response?.data?.message}`, {
        position: "top-right",
        hideProgressBar: false,
        autoClose: 2500,
        theme: "colored",

      });

      console.error("Registration error:",errorBundles);
    });
  };

  return (
    <Navbar
      bg="light"
      expand="lg"
      fixed="top"
      className="px-3 shadow-lg"
    >
      <Navbar.Brand as={Link} to="/">Azharul</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        {/* Centering the nav items */}
        <Nav className="mx-auto" style={{ width: "100%", justifyContent: "center" }}>
          <Nav.Link as={Link} to="/" active={location.pathname === "/"}>
            Home
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
      
      {/* Logout Button on the Right */}
      <Button variant="danger" className="ms-auto" onClick={()=>handleLogout()}>
        Logout
      </Button>
    </Navbar>
  );
};

export default NavigationBar;
