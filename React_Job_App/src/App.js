import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Nav, Navbar, Container } from "react-bootstrap";
import { RiAccountCircleFill } from "react-icons/ri";
import { IoBriefcase, IoLogOut } from "react-icons/io5";
import { MdOutlinePostAdd } from "react-icons/md";
import Jobs from "./components/Jobs/Jobs";
import JobDetails from "./components/JobDetails/jobDetails";
import ApplyFormSubmit from "./components/ApplyForm/ApplyFormSubmit";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Form from "./pages/Registration/Form";
import { AuthProvider, useAuth } from "./Auth/AuthProvider";
import PrivateRoute from "./Auth/PrivateRoute";
import Logout from "./pages/Logout/Logout";
import Display from "./components/Profile/Display";
import PostJob from "./components/PostJob/PostJob";

function NavbarLinks() {
  const { isAuthenticated, userRole, logout } = useAuth();

  return (
    <Nav className="justify-content-end" variant="underline">
      {isAuthenticated && userRole === "user" && (
        <>
          <Nav.Link as={Link} to="/jobs" className="nav-link-icons">
            <IoBriefcase color="white" size={20} />
          </Nav.Link>
          <Nav.Link as={Link} to="/profile" className="nav-link-icons">
            <RiAccountCircleFill color="white" size={22} />
          </Nav.Link>
          <Nav.Link as={Link} to="/logout" onClick={logout} className="nav-link-icons">
            <IoLogOut color="white" size={22} />
          </Nav.Link>
        </>
      )}
      {isAuthenticated && userRole === "admin" && (
        <>
          <Nav.Link as={Link} to="/postjob" className="nav-link-icons">
            <MdOutlinePostAdd color="white" size={24} />
            <span className="nav-link-text">Post Job</span>
          </Nav.Link>
          <Nav.Link as={Link} to="/logout" onClick={logout} className="nav-link-icons">
            <IoLogOut color="white" size={22} />
          </Nav.Link>
        </>
      )}
      {!isAuthenticated && (
        <>
          <Nav.Link as={Link} to="/login" className="login-box">
            Login
          </Nav.Link>
          <Nav.Link as={Link} to="/registration" className="register-box">
            Register
          </Nav.Link>
        </>
      )}
    </Nav>
  );
}

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Navbar className="navbar-container" data-bs-theme="dark">
            <Container>
              <Navbar.Brand as={Link} to="/home">
                JobPortal
              </Navbar.Brand>
              <NavbarLinks />
            </Container>
          </Navbar>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/registration" element={<Form />} />
            <Route path="/logout" element={<Logout />} />

            <Route element={<PrivateRoute />}>
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/profile" element={<Display />} />
              <Route path="/submit" element={<ApplyFormSubmit />} />
              <Route path="/job/:id" element={<JobDetails />} />
              <Route path="/postjob" element={<PostJob />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
