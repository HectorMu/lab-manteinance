import React from "react";
import {
  Card,
  Container,
  Col,
  Button,
  FloatingLabel,
  FormControl,
  FormSelect,
} from "react-bootstrap";

const Form = () => {
  return (
    <Container fluid>
      <Col lg="8" className="mx-auto">
        <Card className="shadow">
          <Card.Header as="h5">Register new user</Card.Header>
          <Card.Body>
            <form>
              <FloatingLabel
                controlId="Username"
                label="Username"
                className="mb-3"
              >
                <FormControl type="text" placeholder="Username" />
              </FloatingLabel>
              <FloatingLabel
                controlId="Fullname"
                label="Fullname"
                className="mb-3"
              >
                <FormControl type="text" placeholder="Fullname" />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingInput"
                label="Email"
                className="mb-3"
              >
                <FormControl type="email" size="sm" placeholder="Email" />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingInput"
                label="Password"
                className="mb-3"
              >
                <FormControl type="password" size="sm" placeholder="Password" />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingInput"
                label="Confirm password"
                className="mb-3"
              >
                <FormControl type="password" size="sm" placeholder="Confirm" />
              </FloatingLabel>
              <div className="mb-3">
                <FormSelect aria-label="User rol">
                  <option>Choose a role</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </FormSelect>
              </div>
            </form>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card>
      </Col>
    </Container>
  );
};

export default Form;
