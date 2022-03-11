import React from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import imglogin from "../../assets/imglogin.svg";
import LoginForm from "../../containers/Auth/LoginForm";

const Login = () => {
  return (
    <div className="d-flex align-items-center h-100 justify-content-center">
      <Container>
        <Card className="rounded-0 shadow-lg py-3">
          <Card.Body>
            <Row>
              <Col
                lg="6"
                xl="6"
                xxl="6"
                className="d-flex flex-column justify-content-center "
              >
                <div className="py-2">
                  <h1 className="text-center">Welcome back</h1>
                  <h5 className="text-center">
                    Log in to continue improving your computer lab.
                  </h5>
                </div>
                <LoginForm />
              </Col>
              <Col lg="6" xl="6" xxl="6">
                <img src={imglogin} className="w-100" alt="" />
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Login;
