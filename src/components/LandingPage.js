import React from "react";
import { Link } from "react-router-dom";
import { Button, Container } from "reactstrap";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div fluid>
        <Container fluid>
          <h1 className="display-3">Welcome to our Loan Management App!</h1>
          <p className="lead">Register or login to get started.</p>
          <hr className="my-2" />
          <p>This application allows users to manage loans and payments.</p>
          <p className="lead">
            <Link to="/register">
              <Button color="primary" size="lg" className="mr-3">
                Register
              </Button>
            </Link>
            <Link to="/login">
              <Button color="secondary" size="lg">
                Login
              </Button>
            </Link>
          </p>
        </Container>
      </div>
    </div>
  );
};

export default LandingPage;
