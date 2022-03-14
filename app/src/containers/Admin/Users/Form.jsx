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
import FormEntries from "./FormEntries";
import usersService from "../../../services/Admin/users.service";
import toast from "react-hot-toast";
import useRouterHooks from "../../../hooks/useRouterHooks";

const Form = () => {
  const [user, setUser] = useState(FormEntries);
  const [onEditing, setonEditing] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const { navigate, location, params } = useRouterHooks();

  const handleChange = (key, value) => setUser({ ...user, [key]: value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (onEditing) {
      if (!editPassword) {
        delete user.password;
        delete user.confirm;
      }
      const results = await usersService.Update(user, params.id);
      if (!results.status) {
        return toast.error(results.statusText);
      }

      toast.success("User edited successfully");
      navigate("/users");
    } else {
      const results = await usersService.Save(user);
      if (!results.status) {
        return toast.error(results.statusText);
      }

      toast.success("User saved successfully");
      navigate("/users");
    }
  };

  const getUserFromFetch = useCallback(async () => {
    const fetchedUser = await usersService.ListOne(params.id);

    if (!fetchedUser.id) {
      toast.error("This user doesn't exists");
      navigate("/users");
      return;
    }
    setUser(fetchedUser);
  }, [params.id]);

  useEffect(() => {
    if (location.pathname.includes("edit")) {
      setonEditing(true);
      getUserFromFetch();
      return;
    }
    setonEditing(false);
    setEditPassword(true);
  }, [location.pathname, getUserFromFetch]);

  return (
    <Container fluid>
      <Col lg="8" className="mx-auto">
        <Card className="shadow">
          <Card.Header as="h5">
            {onEditing ? "Edit user" : "Add new user"}
          </Card.Header>
          <Card.Body>
            <form onSubmit={handleSubmit}>
              <FloatingLabel
                controlId="Username"
                label="Username"
                className="mb-3"
              >
                <FormControl
                  type="text"
                  placeholder="Username"
                  onChange={(e) => handleChange("username", e.target.value)}
                  value={user.username}
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="Fullname"
                label="Fullname"
                className="mb-3"
              >
                <FormControl
                  type="text"
                  placeholder="Fullname"
                  onChange={(e) => handleChange("fullname", e.target.value)}
                  value={user.fullname}
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingInput"
                label="Email"
                className="mb-3"
              >
                <FormControl
                  type="email"
                  size="sm"
                  placeholder="Email"
                  onChange={(e) => handleChange("email", e.target.value)}
                  value={user.email}
                />
              </FloatingLabel>

              {onEditing ? (
                <div className="d-flex justify-content-start mb-3">
                  <ToggleButton
                    type="radio"
                    id="togglePassword"
                    variant={editPassword ? "primary" : "outline-primary"}
                    value={editPassword}
                    size="sm"
                    onChange={() => setEditPassword(!editPassword)}
                  >
                    {editPassword
                      ? "Changuing password... click to cancel"
                      : "Change password?"}
                  </ToggleButton>
                </div>
              ) : null}
              {editPassword ? (
                <>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Password"
                    className="mb-3"
                  >
                    <FormControl
                      type="password"
                      size="sm"
                      placeholder="Password"
                      onChange={(e) => handleChange("password", e.target.value)}
                      value={user.password}
                    />
                  </FloatingLabel>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Confirm password"
                    className="mb-3"
                  >
                    <FormControl
                      type="password"
                      size="sm"
                      placeholder="Confirm"
                      onChange={(e) => handleChange("confirm", e.target.value)}
                      value={user.confirm}
                    />
                  </FloatingLabel>
                </>
              ) : null}

              <div className="mb-3">
                <FormSelect
                  onChange={(e) => handleChange("fk_rol", e.target.value)}
                  aria-label="User rol"
                  value={user.fk_rol}
                >
                  <option>Choose a role</option>
                  <option value="1">Admin</option>
                  <option value="2">User</option>
                </FormSelect>
              </div>
              <div className="d-flex justify-content-center gap-3 mt-3">
                <Button type="submit" variant="primary">
                  Save
                </Button>
                <Link className="btn btn-secondary" to="/users">
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
