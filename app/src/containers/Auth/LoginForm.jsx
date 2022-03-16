import React, { useState } from "react";
import { FormControl, FloatingLabel, Button } from "react-bootstrap";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useSession from "../../hooks/useSession";
import auth from "../../services/auth";

const authCred = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const [credentials, setCredentials] = useState(authCred);
  const { setUser } = useSession();
  const navigate = useNavigate();

  const handleChange = (key, value) =>
    setCredentials({ ...credentials, [key]: value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const results = await auth.Login(credentials);
    if (!results.status) {
      return toast.error(results.statusText);
    }

    window.localStorage.setItem(
      "labSession",
      JSON.stringify(results.SessionData)
    );

    const user = JSON.parse(window.localStorage.getItem("labSession"));
    setUser(user);

    toast.success("Welcome!");
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <FloatingLabel label="Email" controlId="floatingEmail">
          <FormControl
            type="email"
            placeholder="Email"
            onChange={(e) => handleChange("email", e.target.value)}
            value={credentials.email}
          />
        </FloatingLabel>
      </div>
      <div className="mb-3">
        <FloatingLabel label="Password" controlId="floatingPass">
          <FormControl
            type="password"
            placeholder="Password"
            onChange={(e) => handleChange("password", e.target.value)}
            value={credentials.password}
          />
        </FloatingLabel>
      </div>
      <div className="d-flex justify-content-center">
        <Button type="submit" variant="outline-dark" className="w-50">
          Log in
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
