import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../Styles/ComponentStyles/ai-search-sect.css";

function DiscoverSearchCardComp({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className="ai-whole-container d-flex justify-content-center align-items-center entire-search">
      <Row className="ai-containter">
        <Col
          xs={12}
          className="entire-search d-flex justify-content-center align-items-center"
        >
          <div>
            <h1 className="discover-ask-title text-align-center">
              Ask Rekeni for artist and album recommendations
            </h1>
            <p className="discover-promt">
              Start off by searching for an artist you really love!
            </p>
          </div>
        </Col>
        <Col xs={12}>
          <Form
            onSubmit={handleSubmit}
            className="d-flex justify-content-center align-items-center entire-search-discover"
          >
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2 search-form search-discover"
              aria-label="Search"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <Button type="submit" className="search-discover-button">
              Search
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default DiscoverSearchCardComp;
