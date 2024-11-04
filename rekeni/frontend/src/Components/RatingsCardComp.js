import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import placeholderImg from "../Asset/pexels-scenicspire-358690216-28216688.jpg";
import "../Styles/ComponentStyles/ratings-card.css";

function RatingsCardComp() {
  return (
    <Container className="whole-rating-cont d-flex justify-content-center align-items-center">
      <Row className="ratings-box my-4">
        <Col xs={12} className="single-rating-box py-3">
          <Row className="rating-layout">
            <Col xs={4} className="album-cover">
              <img
                className="album-cover-small"
                src={placeholderImg}
                alt="album cover small"
              />
            </Col>
            <Col xs={4} className="album-meta ">
              <h6 className="title-small">Album Title</h6>
              <p className="artist-small">Artist Name</p>
            </Col>
            <Col xs={4} className="user-rating d-flex justify-content-end">
              {/* Rating Section */}
              <div class="d-flex align-items-center stars-rating">
                {/* Filled Stars (for a rating of 3 out of 5) */}
                <i class="bi bi-star-fill text-warning rating-stars"></i>
                <i class="bi bi-star-fill text-warning rating-stars"></i>
                <i class="bi bi-star-fill text-warning rating-stars"></i>
                {/* Unfilled Stars */}
                <i class="bi bi-star-fill rating-stars"></i>
                <i class="bi bi-star-fill rating-stars"></i>
                <span
                  class="ms-2 written-rating
            "
                >
                  (3/5)
                </span>
              </div>
              {/* End Of Rating Section */}
            </Col>
          </Row>
        </Col>
        <Col xs={12} className="single-rating-box py-3">
          <Row className="rating-layout">
            <Col xs={4} className="album-cover">
              <img
                className="album-cover-small"
                src={placeholderImg}
                alt="album cover small"
              />
            </Col>
            <Col xs={4} className="album-meta ">
              <h6 className="title-small">Album Title</h6>
              <p className="artist-small">Artist Name</p>
            </Col>
            <Col xs={4} className="user-rating d-flex justify-content-end">
              {/* Rating Section */}
              <div class="d-flex align-items-center stars-rating">
                {/* Filled Stars (for a rating of 3 out of 5) */}
                <i class="bi bi-star-fill text-warning rating-stars"></i>
                <i class="bi bi-star-fill text-warning rating-stars"></i>
                <i class="bi bi-star-fill text-warning rating-stars"></i>
                {/* Unfilled Stars */}
                <i class="bi bi-star-fill rating-stars"></i>
                <i class="bi bi-star-fill rating-stars"></i>
                <span
                  class="ms-2 written-rating
            "
                >
                  (3/5)
                </span>
              </div>
              {/* End Of Rating Section */}
            </Col>
          </Row>
        </Col>
        <Col xs={12} className="single-rating-box py-3">
          <Row className="rating-layout">
            <Col xs={4} className="album-cover">
              <img
                className="album-cover-small"
                src={placeholderImg}
                alt="album cover small"
              />
            </Col>
            <Col xs={4} className="album-meta ">
              <h6 className="title-small">Album Title</h6>
              <p className="artist-small">Artist Name</p>
            </Col>
            <Col xs={4} className="user-rating d-flex justify-content-end">
              {/* Rating Section */}
              <div class="d-flex align-items-center stars-rating">
                {/* Filled Stars (for a rating of 3 out of 5) */}
                <i class="bi bi-star-fill text-warning rating-stars"></i>
                <i class="bi bi-star-fill text-warning rating-stars"></i>
                <i class="bi bi-star-fill text-warning rating-stars"></i>
                {/* Unfilled Stars */}
                <i class="bi bi-star-fill rating-stars"></i>
                <i class="bi bi-star-fill rating-stars"></i>
                <span
                  class="ms-2 written-rating
            "
                >
                  (3/5)
                </span>
              </div>
              {/* End Of Rating Section */}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default RatingsCardComp;
