import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

const LoginPage = ({setIsLoggedIn, setUserRole}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const storedUserData = JSON.parse(localStorage.getItem("registrationData"));
    if (
      storedUserData &&
      email === storedUserData.email &&
      password === storedUserData.password
    ) {
      setIsLoggedIn(true);
      setUserRole(storedUserData.role);
      e.target.reset();
    } else {
      console.log("Login failed. Please check your credentials.");
    }
  };


  return (
    <div className="wrapper">
      <div className="mt-5 main-wrapper">
        <h2>Login</h2>
        <Form onSubmit={handleLogin}>
          <FormGroup className="mb-3">
            <Label for="email" className="font-weight-bold">
              Email
            </Label>
            <Input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </FormGroup>
          <FormGroup className="mb-3">
            <Label for="password" className="font-weight-bold">
              Password
            </Label>
            <Input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </FormGroup>
          <Button color="primary" className="login-button">
            Login
          </Button>
          <div className="mt-2">
            <a href="/register">Create an account</a>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
