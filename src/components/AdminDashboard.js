import React, { useState, useEffect } from "react";
import { Container, Table, FormGroup, Input } from "reactstrap";

const AdminDashboard = () => {
  const [loanRequests, setLoanRequests] = useState([]);
  useEffect(() => {
    const storedLoanRequests =
      JSON.parse(localStorage.getItem("loanRequests")) || [];
    setLoanRequests(storedLoanRequests);
  }, []);

  const handleUpdateStatus = (id, status) => {
    const updatedLoanRequests = loanRequests.map((request) =>
      request.id === id ? { ...request, status } : request
    );
    setLoanRequests(updatedLoanRequests);
    localStorage.setItem("loanRequests", JSON.stringify(updatedLoanRequests));
  };

  return (
    <Container>
      <h1>Admin Dashboard</h1>
      <Table striped bordered responsive>
        <thead>
          <tr>
            <th>Load ID</th>
            <th>User</th>
            <th>Amount</th>
            <th>Loan Reason</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {loanRequests.map((request) => (
            <tr key={request.id}>
              <td>{request.id}</td>
              <td>{request.userName}</td>
              <td>{request.loanAmount}</td>
              <td>{request.loanReason}</td>
              <td>
                {request.status === "Paid" ? (
                  "Loan Clear"
                ) : (
                  <FormGroup>
                    <Input
                      type="select"
                      value={request.status}
                      onChange={(e) =>
                        handleUpdateStatus(request.id, e.target.value)
                      }
                    >
                      <option value="Paid">Paid</option>
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </Input>
                  </FormGroup>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminDashboard;
