import React, { useState } from "react";
import { Container, Button, Table } from "react-bootstrap";
import List from "../../../containers/Admin/Users/List";
import { Link } from "react-router-dom";

const Users = () => {
  return (
    <Container fluid>
      <div className="d-flex flex-column flex-lg-row justify-content-between mb-4">
        <h2>Users</h2>
        <Link className="btn btn-primary btn-sm h-100" to="/users/add">
          New user <i className="fas fa-plus"></i>
        </Link>
      </div>

      <List />
    </Container>
  );
};

export default Users;
