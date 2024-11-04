import React from "react";
import "../Styles/main.css";

import { Container, Row, Col } from "react-bootstrap";
import NavbarComp from "../Components/NavbarComp";
import LoginFormComp from "../Components/LoginFormComp";

function Login() {
  return (
    <Container fluid>
      <Row>
        <Col xs={12}>
          <NavbarComp />
        </Col>
      </Row>
      <Row>
        <LoginFormComp />
      </Row>
    </Container>
  );
}

export default Login;
