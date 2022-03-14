import React from "react";
import List from "../../../containers/Admin/Computers/List";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

const Computers = () => {
  return (
    <Container fluid>
      <div className="d-flex flex-column flex-lg-row justify-content-between mb-4">
        <h2>Computers</h2>
        <Link className="btn btn-primary btn-sm h-100" to="/computers/add">
          New computer <i className="fas fa-plus"></i>
        </Link>
      </div>
      <List />
    </Container>
  );
};

export default Computers;
