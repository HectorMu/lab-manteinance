import React, { useEffect, useState, useCallback } from "react";
import {
  Card,
  Container,
  Col,
  Button,
  FloatingLabel,
  FormControl,
  FormSelect,
  ToggleButton,
} from "react-bootstrap";
import { Link } from "react-router-dom";

import labsService from "../../../services/Admin/labs.service";
import toast from "react-hot-toast";
import useRouterHooks from "../../../hooks/useRouterHooks";

const Form = () => {
  const [lab, setLab] = useState({ location: "" });
  const [onEditing, setonEditing] = useState(false);
  const { navigate, location, params } = useRouterHooks();

  const handleChange = (key, value) => setLab({ ...lab, [key]: value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (onEditing) {
      const results = await labsService.Update(lab, params.id);
      if (!results.status) {
        return toast.error(results.statusText);
      }

      toast.success("Laboratory edited successfully");
      navigate("/labs");
    } else {
      const results = await labsService.Save(lab);
      if (!results.status) {
        return toast.error(results.statusText);
      }

      toast.success("Laboratory saved successfully");
      navigate("/labs");
    }
  };

  const getLabFromFetch = useCallback(async () => {
    const fetchedLab = await labsService.ListOne(params.id);

    if (!fetchedLab.id) {
      toast.error("This lab doesn't exists");
      navigate("/labs");
      return;
    }
    setLab(fetchedLab);
  }, [params.id]);

  useEffect(() => {
    if (location.pathname.includes("edit")) {
      setonEditing(true);
      getLabFromFetch();
      return;
    }
    setonEditing(false);
  }, [location.pathname, getLabFromFetch]);

  return (
    <Container fluid>
      <Col lg="8" className="mx-auto">
        <Card className="shadow">
          <Card.Header as="h5">
            {onEditing ? "Edit lab" : "Add new lab"}
          </Card.Header>
          <Card.Body>
            <form onSubmit={handleSubmit}>
              <FloatingLabel
                controlId="labname"
                label="Lab location"
                className="mb-3"
              >
                <FormControl
                  type="text"
                  placeholder="Lab location"
                  onChange={(e) => handleChange("location", e.target.value)}
                  value={lab.location}
                />
              </FloatingLabel>

              <div className="d-flex justify-content-center gap-3 mt-3">
                <Button type="submit" variant="primary">
                  Save
                </Button>
                <Link className="btn btn-secondary" to="/labs">
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
