import React from "react";
import { Container } from "react-bootstrap";
import List from "../../../containers/Admin/Maintenances/List";
import { Link } from "react-router-dom";

const Labs = () => {
  return (
    <Container fluid>
      <div className="d-flex flex-column flex-lg-row justify-content-between mb-4">
        <h2>Maintenances</h2>
        <Link className="btn btn-primary btn-sm h-100" to="/maintenances/add">
          New <i className="fas fa-plus"></i>
        </Link>
      </div>

      <List />
    </Container>
  );
};

export default Labs;
