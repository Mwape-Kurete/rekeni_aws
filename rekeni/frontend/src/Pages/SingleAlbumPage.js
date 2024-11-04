import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

import NavbarComp from "../Components/NavbarComp";
import FooterComp from "../Components/FooterComp";
import ReviewCardComp from "../Components/ReviewCardComp";
import AlbumSectComp from "../Components/AlbumSectComp";

import { Container, Row, Col } from "react-bootstrap";

function SingleAlbumPage() {
  //for loading single album
  const location = useLocation();
  const [singleAlbum, setSingleAlbum] = useState({ images: [] });
  const [isLoading, setIsLoading] = useState(true);
  const query = new URLSearchParams(location.search).get("query");

  //for loading reviews
  const [allReviews, setAllReviews] = useState([]);

  useEffect(() => {
    const fetchSingleAlbum = async () => {
      try {
        const response = await axios.get(`/api/fetchAlbum/${query}`);
        setSingleAlbum(response.data);
        const albumId = response.data._id; // Get albumId from response
        if (albumId) {
          fetchReviews(albumId); // Call fetchReviews after albumId is set
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error Fetching this album's data: ", error);
      }
    };

    const fetchReviews = async (id) => {
      try {
        const response = await axios.get(`/api/review/${id}`);
        console.log("Fetched reviews:", response.data);
        setAllReviews(response.data);
      } catch (error) {
        console.error("There was an error fetching reviews: ", error);
      }
    };

    fetchSingleAlbum();
  }, [query]); // Only depend on `query` so `fetchSingleAlbum` runs when the query changes

  if (isLoading) {
    return <p className="load">Loading...</p>;
  }

  return (
    <Container fluid>
      <Row>
        <Col xs={12}>
          <NavbarComp />
        </Col>
      </Row>
      <Row className="whole-single-ablum-info">
        <Col xs={12} className="single-album-info-container">
          <AlbumSectComp singleAlbum={singleAlbum} />
        </Col>
      </Row>
      <Row className="review-section-single">
        <Col className="review-single-cont col-12 d-flex justify-content-center align-items-center">
          <ReviewCardComp allReviews={allReviews} location={location} />
        </Col>
      </Row>
      <footer>
        <FooterComp />
      </footer>
    </Container>
  );
}

export default SingleAlbumPage;
