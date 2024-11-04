import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../Services/UserContext";
import { Container, Row, Col } from "react-bootstrap";
import NavbarComp from "../Components/NavbarComp";
import UserInformation from "../Components/UserInformation";
import ReviewCardComp from "../Components/ReviewCardComp";
import FooterComp from "../Components/FooterComp";
import AlbumArtistTilesComp from "../Components/AlbumArtistTilesComp";

import "../Styles/main.css";

function Profile() {
  const { user } = useContext(UserContext);
  const [allReviews, setAllReviews] = useState([]);
  const [topAlbums, setTopAlbums] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const userId = user?.userId;

  useEffect(() => {
    const fetchUserReviews = async () => {
      try {
        const response = await axios.get(`/api/review/user/${userId}`);
        setAllReviews(response.data);
      } catch (error) {
        console.error("Error fetching user profile reviews:", error);
      }
    };

    const fetchTopAlbums = async () => {
      try {
        const response = await axios.get(`/api/favourites/${userId}`);
        setTopAlbums(response.data.slice(0, 5)); // Limit to top 5 albums
      } catch (error) {
        console.error("Error fetching user top albums:", error);
      }
    };

    if (userId) {
      fetchUserReviews();
      fetchTopAlbums();
    }
    setIsLoading(false);
  }, [userId]);

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
        <Col xs={12}>
          <UserInformation />
        </Col>
      </Row>
      <br />
      <Row>
        <Col xs={12}>
          <h1 className="top-albums-header">Your Top 5 Albums</h1>
          <div className="cont-for-stack d-flex justify-content-center align-items-center">
            <AlbumArtistTilesComp
              topAlbums={topAlbums}
              setTopAlbums={setTopAlbums}
              userId={userId}
            />
          </div>
        </Col>
      </Row>
      <div className="bottom-divider d-flex justify-content-center align-items-center">
        <Row className="user-ratings-reviews d-flex justify-content-center align-items-center">
          <Col xs={12}>
            <h1 className="user-reviews">Your Reviews</h1>
            <ReviewCardComp allReviews={allReviews} />
          </Col>
        </Row>
      </div>
      <footer>
        <FooterComp />
      </footer>
    </Container>
  );
}

export default Profile;
