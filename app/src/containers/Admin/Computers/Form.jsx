import React, { useState, useEffect } from "react";
import {
  Container,
  Col,
  Card,
  FloatingLabel,
  FormControl,
  Button,
  FormSelect,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import StepOne from "../../../components/Computers/Form/StepOne";
import StepThree from "../../../components/Computers/Form/StepThree";
import StepTwo from "../../../components/Computers/Form/StepTwo";
//import useServiceFetch from "../../../hooks/useServiceFetch";
//import labsService from "../../../services/Admin/labs.service";
import Entries from "./FormEntries";

const Form = () => {
  const [computer, setComputer] = useState(Entries);
  const [currentStep, setCurrentStep] = useState(1);

  const handleChange = (key, value) =>
    setComputer({ ...computer, [key]: value });

  const currentStepText = () => {
    let text = "";
    switch (currentStep) {
      case 1:
        text = "General computer data";
        break;
      case 2:
        text = "Computer hardware";
        break;
      case 3:
        text = "Computer perhipheals";
        break;
    }
    return text;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  console.log(computer);
  return (
    <Container>
      <Col lg="8" className="mx-auto">
        <Card className="shadow">
          <Card.Header as="h5">Add new computer</Card.Header>
          <Card.Body>
            <Card.Title className="text-center">{currentStepText()}</Card.Title>
            <form onSubmit={handleSubmit}>
              <div>
                {currentStep === 1 ? (
                  <StepOne computer={computer} handleChange={handleChange} />
                ) : null}
                {currentStep === 2 ? (
                  <StepTwo computer={computer} handleChange={handleChange} />
                ) : null}
                {currentStep === 3 ? (
                  <StepThree computer={computer} handleChange={handleChange} />
                ) : null}

                <div className="d-flex justify-content-center gap-3 mt-3">
                  {currentStep > 1 ? (
                    <Button
                      onClick={() =>
                        setCurrentStep(currentStep === 1 ? 1 : currentStep - 1)
                      }
                      type="submit"
                      variant="primary"
                    >
                      Back
                    </Button>
                  ) : null}

                  {currentStep !== 3 ? (
                    <Button
                      onClick={() =>
                        setCurrentStep(currentStep === 3 ? 3 : currentStep + 1)
                      }
                    >
                      Next
                    </Button>
                  ) : null}
                  {currentStep === 3 ? (
                    <Button type="submit" variant="primary">
                      Save
                    </Button>
                  ) : null}
                </div>
              </div>
            </form>
          </Card.Body>
        </Card>
      </Col>
    </Container>
  );
};

export default Form;
