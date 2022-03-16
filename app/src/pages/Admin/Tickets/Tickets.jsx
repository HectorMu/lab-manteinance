import React from "react";
import { Container } from "react-bootstrap";
import List from "../../../containers/Admin/Tickets/List";
import { Link } from "react-router-dom";

const Tickets = () => {
  return (
    <Container fluid>
      <div className="d-flex flex-column flex-lg-row justify-content-between mb-4">
        <h2>Support tickets</h2>
        <Link className="btn btn-primary btn-sm h-100" to="/tickets/add">
          New ticket <i className="fas fa-plus"></i>
        </Link>
      </div>

      <List />
    </Container>
  );
};

export default Tickets;
