import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import NavbarComp from "../Components/NavbarComp";
import ReviewCardComp from "../Components/ReviewCardComp";
import NewAlbumCardComp from "../Components/NewAlbumsCardComp";
import FooterComp from "../Components/FooterComp";
import AlbumCaroComp from "../Components/AlbumCaroComp";
import { UserContext } from "../Services/UserContext";
import "../Styles/main.css";

function New() {
  const location = useLocation();
  const { user } = useContext(UserContext);
  const [allReviews, setAllReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [mostReviewed, setMostReviewed] = useState([]);
  const [userSuggestions, setUserSuggestions] = useState([]);
  const [isLoadingRecommendations, setIsLoadingRecommendations] =
    useState(true);

  useEffect(() => {
    const fetchUserSuggestions = async () => {
      if (user) {
        try {
          setIsLoadingRecommendations(true);
          const response = await axios.get(
            `/api/recommendations/${user.userId}`
          );
          setUserSuggestions(response.data);
        } catch (error) {
          console.error("Error Fetching User Recommendations: ", error);
        } finally {
          setIsLoadingRecommendations(false);
        }
      }
    };

    const fetchTopReviews = async () => {
      try {
        const response = await axios.get(`/api/review`);
        setAllReviews(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error Fetching Top Reviews: ", error);
      }
    };

    const fetchMostReviewed = async () => {
      try {
        const response = await axios.get("/api/fetchAlbum/most-reviewed");
        setMostReviewed(response.data);
      } catch (error) {
        console.error("Error Fetching Most Reviewed Albums: ", error);
      }
    };

    fetchTopReviews();
    fetchMostReviewed();

    if (user) {
      fetchUserSuggestions();
    }
  }, [user]);

  if (!user) {
    return (
      <Container fluid>
        <NavbarComp />
        <Row>
          <Col xs={12} className="text-center mt-5">
            <h2 className="login-prompt">
              Please log in to see personalized recommendations.
            </h2>
          </Col>
        </Row>
        <FooterComp />
      </Container>
    );
  }

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
      <Row>
        <Col xs={8} className="gy-3 recents">
          <h1 className="recent-revs-header">Recent Reviews</h1>
          <div className="review-container">
            <ReviewCardComp allReviews={allReviews} location={location} />
          </div>
        </Col>
        <Col xs={3} className="gy-3 new-albs-sect">
          <h1 className="recent-revs-header">
            Most Reviewed{" "}
            <small className="small-more-info">scroll to view more</small>
          </h1>
          <div className="d-flex justify-content-end new-albums mb-3">
            <NewAlbumCardComp albumProps={mostReviewed} />
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={8} className="gy-3 popular">
          <h1 className="recent-revs-header">Looking for something new?</h1>
          <p className="explore-prompt">
            explore with Rekeni via our discover page!
          </p>
          {/* <h1 className="recent-revs-header">
            Today's Recommendation is:{" "}
            {userSuggestions[0]?.artist || "Loading..."}
          </h1>
          {isLoadingRecommendations ? (
            <p>Loading recommendations... This may take a while.</p>
          ) : userSuggestions.length === 0 ? (
            <p>
              No recommendations available. Explore new albums and add them to
              your favourites for personalized suggestions!
            </p>
          ) : (
            <div className="popular-albums">
              <AlbumCaroComp albumPropsCards={userSuggestions} />
            </div>
          )} */}
        </Col>
      </Row>
      <footer>
        <FooterComp />
      </footer>
    </Container>
  );
}

export default New;
