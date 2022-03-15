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
import maintenanceService from "../../../services/Admin/maintenance.service";

import Entries from "./FormEntries";

const Form = () => {
  const [maintenance, setMaintenance] = useState(Entries);
  const [onEditing, setonEditing] = useState(false);
  const { location, navigate, params } = useRouterHooks();
  const { state } = location;
  const [computersFromLab, setComputersFromLab] = useState([]);
  const [labs, setLabs] = useState([]);
  const [computers, setComputers] = useState([]);
  useServiceFetch(labsService.List, setLabs);
  useServiceFetch(computersService.List, setComputers);

  const handleChange = (key, value) =>
    setMaintenance({ ...maintenance, [key]: value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (onEditing) {
      const results = await maintenanceService.Update(maintenance, params.id);
      if (!results.status) {
        toast.error(results.statusText);
        return;
      }
      toast.success("Maintenance edited");
      navigate("/maintenances");
    } else {
      const results = await maintenanceService.Save(maintenance);
      if (!results.status) {
        toast.error(results.statusText);
        return;
      }
      toast.success("Maintenance added");
      navigate("/maintenances");
    }
  };

  const getMaintenanceFromFetch = useCallback(async () => {
    const fetchedMaintenance = await maintenanceService.ListOne(params.id);
    if (!fetchedMaintenance.id) {
      toast.error("This maintenance doesn't exists");
      navigate("/maintenances");
      return;
    }
    setMaintenance(fetchedMaintenance);
  }, [params.id]);

  useEffect(() => {
    const computersFiltered = computers.filter(
      (computer) => computer.fk_laboratory === maintenance.fk_laboratory
    );

    setComputersFromLab(computersFiltered);
  }, [maintenance.fk_laboratory]);

  console.log(state);

  useEffect(() => {
    if (state !== null) {
      setMaintenance({
        ...maintenance,
        fk_computer: state.fk_computer,
        fk_laboratory: state.fk_laboratory,
      });
    }
  }, [state]);

  useEffect(() => {
    if (location.pathname.includes("edit")) {
      getMaintenanceFromFetch();
      setonEditing(true);
    }
  }, [location.pathname, getMaintenanceFromFetch]);

  return (
    <Container fluid>
      <Col lg="8" className="mx-auto">
        <Card className="shadow">
          <Card.Header as="h5">
            {onEditing
              ? "Edit maintenance"
              : state === null
              ? "Add new maintenance"
              : "First maintenance"}
          </Card.Header>
          <Card.Body>
            <form onSubmit={handleSubmit}>
              {state === null ? (
                <>
                  <FormSelect
                    onChange={(e) =>
                      handleChange("fk_laboratory", parseInt(e.target.value))
                    }
                    value={maintenance.fk_laboratory}
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
                      onChange={(e) =>
                        handleChange("fk_computer", e.target.value)
                      }
                      value={maintenance.fk_computer}
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
                </>
              ) : (
                <h5 className="text-center">
                  Adding first maintenance to computer {state.fk_computer} from{" "}
                  laboratory {state.fk_laboratory}
                </h5>
              )}

              <FloatingLabel
                controlId="labname"
                label={`${state !== null ? "Description" : "Fixes"}`}
                className="mb-3"
              >
                <FormControl
                  as={"textarea"}
                  type="text"
                  placeholder={`${state !== null ? "Description" : "Fixes"}`}
                  style={{ height: "200px" }}
                  onChange={(e) => handleChange("fixes", e.target.value)}
                  value={maintenance.fixes}
                />
              </FloatingLabel>
              <FloatingLabel controlId="Date" label="Date" className="mb-3">
                <FormControl
                  type="date"
                  placeholder="Date"
                  onChange={(e) => handleChange("date", e.target.value)}
                  value={maintenance.date}
                />
              </FloatingLabel>

              <div className="d-flex justify-content-center gap-3 mt-3">
                <Button type="submit" variant="primary">
                  Save
                </Button>
                <Link className="btn btn-secondary" to="/maintenances">
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
