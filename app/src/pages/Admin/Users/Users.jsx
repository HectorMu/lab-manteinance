import React, { useState } from "react";
import { Container, Button } from "react-bootstrap";
import List from "../../../containers/Admin/Users/List";
import { Link } from "react-router-dom";

const Users = () => {
  return (
    <Container fluid>
      <div className="d-flex justify-content-between mb-4">
        <h2>Users</h2>
        <Button as={Link} to={"/users/add"} variant="primary" size="sm">
          New user <i className="fas fa-plus"></i>
        </Button>
      </div>

      <List />
    </Container>
  );
};

export default Users;
