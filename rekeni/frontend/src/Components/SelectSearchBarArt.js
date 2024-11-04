import React from "react";

import { Form, CloseButton, Button, Container } from "react-bootstrap";

import { Row, Col } from "react-bootstrap";

import "../Styles/ComponentStyles/searchbar-artist.css";

function SelectSearchBarArt() {
  return (
    <Container className="whole-search-top">
      <Row>
        <Col className="col-12">
          <Form className="d-flex justify-content-center align-items-center entire-search-form-top">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2 act-search-form search-top-albs"
              aria-label="Search"
            />
            <Button className="search-top-button">Search</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default SelectSearchBarArt;
