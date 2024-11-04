import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import "../Styles/ComponentStyles/signupform.css";

function SignUpFormComp() {
  const navigate = useNavigate();
  const [error, setError] = useState({});
  const [validated, setValidated] = useState(false);

  // Form state
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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

    if (!username || !email || !bio || !password || !confirmPassword) {
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
    if (password !== confirmPassword) {
      setError((prev) => ({
        ...prev,
        confirmPassword: "Passwords do not match.",
      }));
      return;
    }

    // Axios POST request
    try {
      const response = await axios.post("/api/auth/register", {
        username,
        email,
        bio,
        password,
      });
      if (response.status === 201) {
        navigate("/login");
      }
    } catch (error) {
      setError((prev) => ({
        ...prev,
        form:
          error.response?.data?.error ||
          "Failed to register. Please try again.",
      }));
    }
  };

  return (
    <Container>
      <Row className="d-flex justify-content-center align-items-center">
        <Col md={8} lg={6} xs={12}>
          <h1 className="signup-header text-align-center d-flex justify-content-center align-items-center">
            Sign Up
          </h1>
          <Form
            className="signup-form-container"
            noValidate
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
              <Form.Text className="sub-text">
                We'll never share your email with anyone else.
              </Form.Text>
              {error.email && (
                <Form.Text className="text-danger">{error.email}</Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your username"
                className="login-signup-inputs"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              {error.username && (
                <Form.Text className="text-danger">{error.username}</Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicBio">
              <Form.Label>Bio</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Tell the world about yourself"
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                required
              />
              {error.bio && (
                <Form.Text className="text-danger">{error.bio}</Form.Text>
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

            <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                className={`login-signup-inputs ${
                  validated &&
                  (password === confirmPassword ? "is-valid" : "is-invalid")
                }`}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {error.confirmPassword && (
                <Form.Text className="text-danger">
                  {error.confirmPassword}
                </Form.Text>
              )}
            </Form.Group>

            <div className="d-flex justify-content-center">
              <Button className="signup-btn" type="submit">
                Sign Up
              </Button>
            </div>

            <div className="d-flex justify-content-center align-items-center">
              <Link to="/login" className="signup-login-hyperlink">
                have an account? Login Now!
              </Link>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default SignUpFormComp;
