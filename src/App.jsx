import React from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import SportsHandballIcon from "@mui/icons-material/SportsHandball";
import Dropdown from "react-bootstrap/Dropdown";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./assets/Login";
import SignUp from "./assets/SignUp";
import "./App.css";
import { useUserContext } from "./Contexts/UserContext";
import ProfilePage from "./assets/ProfilePage";
import Home from "./assets/Home";

function App() {
  const navigate = useNavigate();
  const { userToken, logout } = useUserContext();
  console.log(userToken);
  return (
    <>
      <Navbar expand="lg" className="bg-body-primary navbarmain">
        <Container fluid>
          <Navbar.Brand onClick={() => navigate("/home")}>
            Sports <SportsHandballIcon />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll" className="navmain">
            <Nav
              className="me-auto my-2 my-lg-0 navlink"
              style={{ maxHeight: "200px" }}
              navbarScroll
            >
              <Nav.Link onClick={() => navigate("/home")}>Home</Nav.Link>
              <Nav.Link onClick={() => navigate("/home")}>Sports</Nav.Link>
              <Nav.Link onClick={() => navigate("/home")}>ContactUs</Nav.Link>
            </Nav>
            <Form className="d-flex searchIconP">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2 search"
                aria-label="Search"
              />
              <i className="iconSearch fa fa-search"></i>
            </Form>
            <Dropdown>
              <Dropdown.Toggle
                variant="secondary"
                id="dropdown-basic"
                className="username"
              >
                User
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {userToken ? (
                  <>
                    <Dropdown.Item onClick={() => navigate("/profile")}>
                      Profile
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        logout();
                        navigate("/login");
                      }}
                    >
                      Logout
                    </Dropdown.Item>
                  </>
                ) : (
                  <>
                    <Dropdown.Item onClick={() => navigate("/login")}>
                      Login
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => navigate("/signup")}>
                      Register
                    </Dropdown.Item>
                  </>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </>
  );
}

export default App;
