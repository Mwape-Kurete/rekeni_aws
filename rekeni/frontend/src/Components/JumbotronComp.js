import React from "react";
import { Col, Row } from "react-bootstrap";

import "../Styles/ComponentStyles/jumbotron.css";

function JumbotronComp() {
  return (
    <>
      <Row className="whole-jumbotron">
        <Col>
          <h1 className="jumbo-header d-flex justify-content-end">REKENI</h1>
        </Col>
        <Col>
          <p className="jumbo-copy d-flex justify-content-start">
            Discover the heartbeat of music that resonates with your soul. Share
            your favourites, explore new sounds, and connect with friends
            through reviews and recommendations – all with Rekeni.
          </p>
        </Col>
      </Row>
    </>
  );
}

export default JumbotronComp;
