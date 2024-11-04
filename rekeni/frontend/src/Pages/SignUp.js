import React from "react";
import "../Styles/main.css";

import { Container, Row, Col } from "react-bootstrap";
import NavbarComp from "../Components/NavbarComp";
import SignUpFormComp from "../Components/SignUpFormComp";

function signup() {
  return (
    <Container fluid>
      <Row>
        <Col xs={12}>
          <NavbarComp />
        </Col>
      </Row>
      <Row>
        <SignUpFormComp />
      </Row>
    </Container>
  );
}

export default signup;
