import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Table,
  Badge,
} from "reactstrap";

const BorrowerDashboard = () => {
  const [loanRequests, setLoanRequests] = useState([]);
  const handleLoanRequest = (e) => {
    e.preventDefault();
    const userName = e.target.elements.userName.value;
    const loanAmount = e.target.elements.loanAmount.value;
    const loanReason = e.target.elements.loanReason.value;
    const newLoanRequest = {
      id: Date.now(),
      loanAmount,
      userName,
      loanReason,
      status: "Pending",
    };
    setLoanRequests([...loanRequests, newLoanRequest]);
    localStorage.setItem(
      "loanRequests",
      JSON.stringify([...loanRequests, newLoanRequest])
    );
    e.target.reset();
  };

  useEffect(() => {
    const storedLoanRequests =
      JSON.parse(localStorage.getItem("loanRequests")) || [];
    setLoanRequests(storedLoanRequests);
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <h2>Borrower Dashboard</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form onSubmit={handleLoanRequest}>
            <FormGroup>
              <Label for="loanAmount">User Name</Label>
              <Input
                type="text"
                name="userName"
                id="userName"
                placeholder="Enter your Name"
              />
            </FormGroup>
            <FormGroup>
              <Label for="loanAmount">Loan Amount</Label>
              <Input
                type="number"
                name="loanAmount"
                id="loanAmount"
                placeholder="Enter loan amount"
              />
            </FormGroup>
            <FormGroup>
              <Label for="loanReason">Loan Reason</Label>
              <Input
                type="text"
                name="loanReason"
                id="loanReason"
                placeholder="Enter loan reason"
              />
            </FormGroup>
            <Button color="primary" type="submit">
              Request Loan
            </Button>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col>
          <h3>Past Loans</h3>
          <Table>
            <thead>
              <tr>
                <th>Loan ID</th>
                <th>User Name</th>
                <th>Loan Amount</th>
                <th>Loan Reason</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {loanRequests.map((request) => (
                <tr key={request.id}>
                  <td>{request.id}</td>
                  <td>{request.userName}</td>
                  <td>${request.loanAmount}</td>
                  <td>{request.loanReason}</td>
                  <td>
                    {request.status === "Pending" ? (
                      <Badge color="warning">Pending</Badge>
                    ) : request.status === "Approved" ? (
                      <Badge color="success">Approved</Badge>
                    ) : (
                      <Badge color="danger">Rejected</Badge>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default BorrowerDashboard;
