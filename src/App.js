import React, { Suspense, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import "./assets/main.css";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

import LoginPage from "./components/LoginPage";
import RegistrationPage from "./components/RegistrationPage";
import LandingPage from "./components/LandingPage";
import AdminDashboard from "./components/AdminDashboard";
import BorrowerDashboard from "./components/BorrowerDashboard";
import LenderDashboard from "./components/LenderDashboard";
import UserDashboard from "./components/UserDashboard";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");

  const toggle = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div>
        <Navbar color="primary" dark expand="md">
          <NavbarBrand href="/">Lean Admin Dashboard</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              {isLoggedIn && (
                <>
                  {userRole === "admin" && (
                    <>
                      <Link to="/admin">
                        <NavItem>
                          <NavLink>Admin Dashboard</NavLink>
                        </NavItem>
                      </Link>
                      <Link to="/borrower">
                        <NavItem>
                          <NavLink>Borrower Dashboard</NavLink>
                        </NavItem>
                      </Link>
                      <Link to="/lender">
                        <NavItem>
                          <NavLink>Lender Dashboard</NavLink>
                        </NavItem>
                      </Link>
                    </>
                  )}

                  {userRole === "borrower" && (
                    <Link to="/borrower">
                      <NavItem>
                        <NavLink>Borrower Dashboard</NavLink>
                      </NavItem>
                    </Link>
                  )}

                  {userRole === "lender" && (
                    <Link to="/lender">
                      <NavItem>
                        <NavLink>Lender Dashboard</NavLink>
                      </NavItem>
                    </Link>
                  )}

                  <Link to="/user">
                    <NavItem>
                      <NavLink>User Dashboard</NavLink>
                    </NavItem>
                  </Link>
                </>
              )}
            </Nav>
            <Nav navbar>
              {/* Show login and register links when not logged in */}
              {!isLoggedIn ? (
                <>
                  <Link to="/login">
                    <NavItem>
                      <NavLink>Login</NavLink>
                    </NavItem>
                  </Link>
                  <Link to="/register">
                    <NavItem>
                      <NavLink>Registration</NavLink>
                    </NavItem>
                  </Link>
                </>
              ) : (
                // Show logout link when logged in
                <NavItem onClick={handleLogout}>
                  <NavLink>Logout</NavLink>
                </NavItem>
              )}
            </Nav>
          </Collapse>
        </Navbar>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<LandingPage />} />

            <Route path="/register" element={<RegistrationPage />} />
            <Route
              path="/login"
              element={
                <LoginPage
                  setIsLoggedIn={setIsLoggedIn}
                  setUserRole={setUserRole}
                />
              }
            />

            {/* Dashboard routes */}
            {isLoggedIn && (
              <>
                {userRole === "admin" && (
                  <>
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/borrower" element={<BorrowerDashboard />} />
                    <Route path="/lender" element={<LenderDashboard />} />
                  </>
                )}
                {userRole === "borrower" && (
                  <Route path="/borrower" element={<BorrowerDashboard />} />
                )}

                {userRole === "lender" && (
                  <Route path="/lender" element={<LenderDashboard />} />
                )}
                <Route path="/user" element={<UserDashboard />} />
              </>
            )}

            {/* Default route when no matching route is found */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
};

export default App;
