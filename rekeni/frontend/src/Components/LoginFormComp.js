import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

import { UserContext } from "../Services/UserContext";

import "../Styles/ComponentStyles/LoginformComp.css";

function LoginFormComp() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext) || {};
  const [error, setError] = useState({});
  const [validated, setValidated] = useState(false);

  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Validation functions
  const validatePassword = (password) => {
    const lengthCheck = password.length >= 8;
    const numberCheck = /[0-9]/.test(password);
    const specialCharCheck = /[!@#$%^&*]/.test(password);
    return lengthCheck && numberCheck && specialCharCheck;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidated(true);
    setError({});

    // Perform validations
    const isPasswordValid = validatePassword(password);
    const isEmailValid = validateEmail(email);

    if (!email || !password) {
      setError((prev) => ({ ...prev, form: "All fields are required." }));
      return;
    }
    if (!isEmailValid) {
      setError((prev) => ({ ...prev, email: "Invalid email format." }));
      return;
    }
    if (!isPasswordValid) {
      setError((prev) => ({
        ...prev,
        password:
          "Password must be 8+ characters, with at least 1 number and 1 special character.",
      }));
      return;
    }
    // Axios POST request
    try {
      const response = await axios.post("/api/auth/login", {
        email,
        password,
      });
      if (response.status === 200) {
        const user = response.data.user;

        setUser(user);
        console.log(user);
        //localStorage.setItem("userId", user); // saving the user ID
        navigate("/");
      }
    } catch (error) {
      setError((prev) => ({
        ...prev,
        form:
          error.response?.data?.error || "Failed to login. Please try again.",
      }));
    }
  };

  return (
    <Container>
      <Row className="d-flex justify-content-center align-items-center">
        <Col md={8} lg={6} xs={12}>
          <h1 className="login-header text-align-center d-flex justify-content-center align-items-center">
            Login
          </h1>
          <Form
            className="login-form-container"
            validated={validated}
            onSubmit={handleSubmit}
          >
            {error.form && <p className="text-danger">{error.form}</p>}

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                className={`login-signup-inputs ${
                  validated &&
                  (validateEmail(email) ? "is-valid" : "is-invalid")
                }`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {error.email && (
                <Form.Text className="text-danger">{error.email}</Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                className={`login-signup-inputs ${
                  validated &&
                  (validatePassword(password) ? "is-valid" : "is-invalid")
                }`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {error.password && (
                <Form.Text className="text-danger">{error.password}</Form.Text>
              )}
            </Form.Group>

            <div className="d-flex justify-content-center">
              <Button className="login-btn" type="submit">
                Login
              </Button>
            </div>

            <div className="d-flex justify-content-center align-items-center">
              <Link to="/signup" className="signup-login-hyperlink">
                Don't have an account? Sign Up Now!
              </Link>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginFormComp;
