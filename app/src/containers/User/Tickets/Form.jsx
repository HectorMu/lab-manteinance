import React, { useEffect, useState, useCallback } from "react";
import { Card, Col, Button, FloatingLabel, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import maintenanceService from "../../../services/Admin/maintenance.service";

import Entries from "./FormEntries";
import useRouterHooks from "../../../hooks/useRouterHooks";

const Form = () => {
  const [maintenance, setMaintenance] = useState(Entries);
  const { params, navigate } = useRouterHooks();

  const handleChange = (key, value) =>
    setMaintenance({ ...maintenance, [key]: value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const results = await maintenanceService.Save(maintenance);
    if (!results.status) {
      toast.error(results.statusText);
      return;
    }
    toast.success("Maintenance registered");
    navigate("/user/tickets");
  };

  useEffect(() => {
    setMaintenance({
      ...maintenance,
      ticketid: parseInt(params.id),
      fk_computer: parseInt(params.pcid),
      fk_laboratory: parseInt(params.labid),
    });
  }, [params.pcid, params.fk_laboratory]);

  console.log(maintenance);
  return (
    <Col lg="12" className="mx-auto">
      <Card className="shadow">
        <Card.Header as="h5">New maintenance</Card.Header>
        <Card.Body>
          <form onSubmit={handleSubmit}>
            <FloatingLabel controlId="labname" label={`Fixes`} className="mb-3">
              <FormControl
                as={"textarea"}
                type="text"
                placeholder={`Fixes`}
                style={{ height: "200px" }}
                onChange={(e) => handleChange("fixes", e.target.value)}
                value={maintenance.fixes}
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
  );
};

export default Form;
