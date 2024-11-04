import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import NavbarComp from "../Components/NavbarComp";
import ReviewCardComp from "../Components/ReviewCardComp";
import FooterComp from "../Components/FooterComp";

function SingleArtistPage() {
  return (
    <Container fluid>
      <Row>
        <Col xs={12}>
          <NavbarComp />
        </Col>
      </Row>
      <Row className="whole-single-ablum-info">
        <Col xs={12} className="single-album-info-container"></Col>
      </Row>
      <Row className="review-section-single">
        <Col xs={12} className="review-single-cont">
          <ReviewCardComp />
        </Col>
      </Row>
      <footer>
        <FooterComp />
      </footer>
    </Container>
  );
}

export default SingleArtistPage;
