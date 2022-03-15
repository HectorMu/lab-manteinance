import React, { useEffect, useState, useCallback } from "react";
import {
  Card,
  Container,
  Col,
  Button,
  FloatingLabel,
  FormControl,
  FormSelect,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import useRouterHooks from "../../../hooks/useRouterHooks";
import useServiceFetch from "../../../hooks/useServiceFetch";

import labsService from "../../../services/Admin/labs.service";
import computersService from "../../../services/Admin/computers.service";
import supportticketsService from "../../../services/Admin/supporttickets.service";

import Entries from "./FormEntries";

const Form = () => {
  const [ticket, setTicket] = useState(Entries);
  const [onEditing, setonEditing] = useState(false);
  const { location, navigate, params } = useRouterHooks();
  const [computersFromLab, setComputersFromLab] = useState([]);
  const [labs, setLabs] = useState([]);
  const [computers, setComputers] = useState([]);
  useServiceFetch(labsService.List, setLabs);
  useServiceFetch(computersService.List, setComputers);

  const handleChange = (key, value) => setTicket({ ...ticket, [key]: value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (onEditing) {
      const results = await supportticketsService.Update(ticket, params.id);
      if (!results.status) {
        toast.error(results.statusText);
        return;
      }
      toast.success("Ticket edited");
      navigate("/tickets");
    } else {
      const results = await supportticketsService.Save(ticket);
      if (!results.status) {
        toast.error(results.statusText);
        return;
      }
      toast.success("Ticket added");
      navigate("/tickets");
    }
  };

  const getTicketFromFetch = useCallback(async () => {
    const fetchedTicket = await supportticketsService.ListOne(params.id);
    if (!fetchedTicket.id) {
      toast.error("This ticket doesn't exists");
      navigate("/tickets");
      return;
    }
    setTicket(fetchedTicket);
  }, [params.id]);

  useEffect(() => {
    const computersFiltered = computers.filter(
      (computer) => computer.fk_laboratory === ticket.fk_laboratory
    );

    setComputersFromLab(computersFiltered);
  }, [ticket.fk_laboratory]);

  useEffect(() => {
    if (location.pathname.includes("edit")) {
      getTicketFromFetch();
      setonEditing(true);
    }
  }, [location.pathname, getTicketFromFetch]);

  return (
    <Container fluid>
      <Col lg="8" className="mx-auto">
        <Card className="shadow">
          <Card.Header as="h5">
            {onEditing ? "Edit support ticket" : "New support ticket"}
          </Card.Header>
          <Card.Body>
            <form onSubmit={handleSubmit}>
              <FormSelect
                onChange={(e) =>
                  handleChange("fk_laboratory", parseInt(e.target.value))
                }
                value={ticket.fk_laboratory}
                aria-label="labselect"
                className="mb-3"
              >
                <option value={""}>Select a lab</option>
                {labs && labs?.length > 0
                  ? labs.map((lab) => (
                      <option key={lab.id} value={lab.id}>
                        {lab.id} - {lab.location}
                      </option>
                    ))
                  : null}
              </FormSelect>

              {computersFromLab.length > 0 ? (
                <FormSelect
                  aria-label="labselect"
                  onChange={(e) => handleChange("fk_computer", e.target.value)}
                  value={ticket.fk_computer}
                  className="mb-3"
                >
                  <option value={""}>Select a computer</option>
                  {computersFromLab.map((computer) => (
                    <option key={computer.id} value={computer.id}>
                      {computer.id} - {computer.brand}
                    </option>
                  ))}
                </FormSelect>
              ) : null}

              <FloatingLabel
                controlId="labname"
                label={"Required fixes"}
                className="mb-3"
              >
                <FormControl
                  as={"textarea"}
                  type="text"
                  placeholder={`Required fixes`}
                  style={{ height: "200px" }}
                  onChange={(e) =>
                    handleChange("required_fixes", e.target.value)
                  }
                  value={ticket.required_fixes}
                />
              </FloatingLabel>

              {onEditing ? (
                <FormSelect
                  onChange={(e) => handleChange("status", e.target.value)}
                  value={ticket.status}
                  aria-label="statusselect"
                  className="mb-3"
                >
                  <option value={""}>Status</option>
                  <option value={"Open"}>Open</option>
                  <option value={"Process"}>Process</option>
                  <option value={"Closed"}>Closed</option>
                </FormSelect>
              ) : null}

              <div className="d-flex justify-content-center gap-3 mt-3">
                <Button type="submit" variant="primary">
                  Save
                </Button>
                <Link className="btn btn-secondary" to="/tickets">
                  Cancel
                </Link>
              </div>
            </form>
          </Card.Body>
        </Card>
      </Col>
    </Container>
  );
};

export default Form;
