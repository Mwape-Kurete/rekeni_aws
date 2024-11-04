import React, { useState } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";

import NavbarComp from "../Components/NavbarComp";
import FooterComp from "../Components/FooterComp";
import DiscoverSearchCardComp from "../Components/DiscoverSearchCardComp";
import ArtistResultComp from "../Components/ArtistResultComp";

import "../Styles/main.css";

function Discover() {
  const [artistResults, setArtistResults] = useState([]); // Store multiple artists' data
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (query) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `/api/discover?artistQuery=${encodeURIComponent(query)}`,
        {
          timeout: 60000, // 60 seconds timeout
        }
      );

      // Logging response for debugging
      console.log("Response data:", response.data);

      // Set the artistResults array
      setArtistResults(response.data);
    } catch (error) {
      console.error("Error Fetching discover results:", error.message);
      if (error.response) {
        console.error("Response data:", error.response.data);
      }
      alert("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col xs={12}>
          <NavbarComp />
        </Col>
      </Row>
      <Row className="discover-search-cent">
        <Col xs={12} className="discover-sect-card">
          <DiscoverSearchCardComp onSearch={handleSearch} />
        </Col>
      </Row>
      <Row className="album-populate">
        <Col xs={12} className="expand-album-gen">
          {isLoading ? (
            <p className="load">
              Loading... This might take a while, please wait.
            </p>
          ) : artistResults.length > 0 ? (
            artistResults.map((artistData, index) => (
              <ArtistResultComp
                key={index}
                artist={artistData.artist}
                albums={artistData.topAlbums}
                loading={isLoading}
              />
            ))
          ) : (
            <p className="load-fail">
              No artists found. Please try another search.
            </p>
          )}
        </Col>
      </Row>
      <footer>
        <FooterComp />
      </footer>
    </Container>
  );
}

export default Discover;
