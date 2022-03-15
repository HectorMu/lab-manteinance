import React, { useCallback, useEffect, useState } from "react";
import { Container, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import StepOne from "../../../components/Computers/Form/StepOne";
import StepThree from "../../../components/Computers/Form/StepThree";
import StepTwo from "../../../components/Computers/Form/StepTwo";
//import useServiceFetch from "../../../hooks/useServiceFetch";
import computersService from "../../../services/Admin/computers.service";
import useRouterHooks from "../../../hooks/useRouterHooks";
import Entries from "./FormEntries";
import toast from "react-hot-toast";

const Form = () => {
  const [computer, setComputer] = useState(Entries);
  const [currentStep, setCurrentStep] = useState(1);
  const [onEditing, setOnEditing] = useState(false);
  const { navigate, location, params } = useRouterHooks();

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
    if (onEditing) {
      const results = await computersService.Update(computer, params.id);
      if (!results.status) {
        toast.error(results.statusText);
        return;
      }
      toast.success("Computer edited");
      navigate("/computers");
    } else {
      const results = await computersService.Save(computer);
      if (!results.status) {
        toast.error(results.statusText);
        return;
      }
      const stateToMaintenance = {
        fk_computer: results.insertedId,
        ...computer,
      };
      toast.success("Computer saved");
      navigate("/maintenances/add", { state: stateToMaintenance });
    }
  };

  const getComputerFromFetch = useCallback(async () => {
    const fetchedComputer = await computersService.ListOne(params.id);
    if (!fetchedComputer.id) {
      toast.error("This computer doesn't exists");
      navigate("/computers");
      return;
    }
    setComputer(fetchedComputer);
  }, []);

  useEffect(() => {
    if (location.pathname.includes("edit")) {
      getComputerFromFetch();
      setOnEditing(true);
    }
  }, [location.pathname, getComputerFromFetch]);

  return (
    <Container>
      <Col lg="8" className="mx-auto">
        <Card className="shadow">
          <Card.Header as="h5">
            {onEditing ? "Edit computer" : "Add computer"}
          </Card.Header>
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
