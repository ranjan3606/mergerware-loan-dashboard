import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Table,
  Toast,
  ToastBody,
  ToastHeader,
} from "reactstrap";

const LenderDashboard = () => {
  const [showToast, setShowToast] = useState(false);
  const [loanRequests, setLoanRequests] = useState([]);

  const handleConfirmPayment = (loanId) => {
    const updatedLoans = loanRequests.map((loan) =>
      loan.id === loanId ? { ...loan, status: "Paid" } : loan
    );
    setLoanRequests(updatedLoans);
    setShowToast(true);
  };

  useEffect(() => {
    const storedLoanRequests =
      JSON.parse(localStorage.getItem("loanRequests")) || [];
    setLoanRequests(storedLoanRequests);
  }, []);

  const handlePay = (loanId) => {
    handleConfirmPayment(loanId);
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Lender Dashboard</h1>
          <Table>
            <thead>
              <tr>
                <th>Loan ID</th>
                <th>Borrower</th>
                <th>Amount</th>
                <th>Reason</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {loanRequests.map((loan) => (
                <tr key={loan.id}>
                  <td>{loan.id}</td>
                  <td>{loan.userName}</td>
                  <td>{loan.loanAmount}</td>
                  <td>{loan.loanReason}</td>
                  <td>
                    {loan.status === "Pending" && (
                      <Button
                        color="success"
                        onClick={() => handleConfirmPayment(loan.id)}
                      >
                        Paid
                      </Button>
                    )}
                    {loan.status === "Approved" ? (
                      <Button
                        color="primary"
                        onClick={() => handlePay(loan.id)}
                      >
                        Pay
                      </Button>
                    ) : (
                      <p>Not Any Pending Payment</p>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      {/* Step 4: Show the toast message when showToast is true */}
      <Row>
        <Col>
          <Toast
            isOpen={showToast}
            style={{ position: "fixed", top: "80px", right: "30px" }}
          >
            <ToastHeader toggle={() => setShowToast(false)}>
              Payment Status
            </ToastHeader>
            <ToastBody>Payment successfully confirmed!</ToastBody>
          </Toast>
        </Col>
      </Row>
    </Container>
  );
};

export default LenderDashboard;
