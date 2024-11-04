import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

import "../Styles/main.css";

import NavbarComp from "../Components/NavbarComp";
import SearchResultComp from "../Components/SearchResultComp";
import SelectedAlbumCardComp from "../Components/SelectedAlbumCardComp";

import { Container, Row, Col } from "react-bootstrap";

import "../Styles/main.css";

function SearchGen() {
  const location = useLocation();
  const [albums, setAlbums] = useState([]);
  const query = new URLSearchParams(location.search).get("query");

  const [selectedAlbum, setSelectedAlbum] = useState(null);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await axios.get(`/api/searchAlbums?query=${query}`);
        setAlbums(response.data);
      } catch (error) {
        console.error("Error Fetching search results: ", error);
      }
    };

    if (query) {
      fetchAlbums();
    }
  }, [query]);

  return (
    <Container fluid>
      <Row>
        <Col xs={12}>
          <NavbarComp />
        </Col>
      </Row>
      <Row className="album-populate d-flex justify-content-center align-items-center">
        <Col xs={12} className="expand-album-gen">
          <SearchResultComp albums={albums} onSelectAlbum={setSelectedAlbum} />
        </Col>
      </Row>
      <Row className="discover-search-cent">
        <Col xs={12} className="discover-sect-card">
          {selectedAlbum && <SelectedAlbumCardComp album={selectedAlbum} />}
        </Col>
      </Row>
    </Container>
  );
}

export default SearchGen;
