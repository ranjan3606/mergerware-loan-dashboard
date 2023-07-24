import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

const RegistrationPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const registrationData = {
      email: email,
      password: password,
      role: role,
    };

    localStorage.setItem("registrationData", JSON.stringify(registrationData));

    console.log("Registration Data:", registrationData);
  };

  return (
    <div className="wrapper">
      <div className="main-wrapper mt-5">
        <h2>Registration Page</h2>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter your password"
            />
          </FormGroup>
          <FormGroup>
            <Label for="role">Role</Label>
            <Input
              type="select"
              name="role"
              id="role"
              value={role}
              onChange={handleRoleChange}
            >
              <option value="">Select a role</option>
              <option value="admin">Admin</option>
              <option value="borrower">Borrower</option>
              <option value="lender">Lender</option>
            </Input>
          </FormGroup>
          <Button color="primary">Register</Button>
        </Form>
      </div>
    </div>
  );
};

export default RegistrationPage;
