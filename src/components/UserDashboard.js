import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, CardBody, Badge } from "reactstrap";

const UserDashboard = () => {
  const [loanRequests, setLoanRequests] = useState([]);
  console.log(loanRequests);
  const storedUserData = JSON.parse(localStorage.getItem("registrationData"));
  useEffect(() => {
    const storedLoanRequests =
      JSON.parse(localStorage.getItem("loanRequests")) || [];
    setLoanRequests(storedLoanRequests);
  }, []);

  return (
    <Container>
      <Row className="mt-4">
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <Card>
            <CardBody>
              <h3 className="mb-4">User Dashboard</h3>
              <p>Email: {storedUserData.email}</p>
              <p>Role: {storedUserData.role}</p>

              <>
                <h5 className="mt-4">Request Loan</h5>
                <ul>
                  {loanRequests.map((loan) => {
                    return (
                      <>
                        {loan.status === "Pending" && (
                          <li key={loan.id}>
                            Loan ID: {loan.id}, Amount: ${loan.loanAmount},
                            Status: <Badge color="warning">Pending</Badge>
                            {loan.status === "paid" && (
                              <Badge color="success">Success</Badge>
                            )}
                          </li>
                        )}
                      </>
                    );
                  })}
                </ul>
              </>

              <h5 className="mt-4">Past Loans</h5>
              <ul>
                {loanRequests.map((loan) => {
                  return (
                    <>
                      {loan.status === "Approved" && (
                        <li key={loan.id}>
                          Amount: ${loan.loanAmount},
                          Status: <Badge color="success">Success</Badge>
                        </li>
                      )}
                    </>
                  );
                })}
              </ul>

              <h5 className="mt-4">Past Payments</h5>
              <ul>
              {loanRequests.map((loan) => {
                  return (
                    <>
                      {loan.status === "Paid" && (
                        <li key={loan.id}>
                          Amount: ${loan.loanAmount},
                          Status: <Badge color="success">Clear</Badge>
                          
                        </li>
                      )}
                    </>
                  );
                })}
              </ul>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserDashboard;
