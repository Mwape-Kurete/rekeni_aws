import React from "react";
import { Row, Col } from "react-bootstrap";
import "../Styles/ComponentStyles/search-results.css";
import placeholderImg from "../Asset/pexels-scenicspire-358690216-28216688.jpg";

function SearchResultComp({ albums = [], onSelectAlbum }) {
  return (
    <Row className="results-search-contain">
      {albums.length ? (
        albums.map((album) => (
          <Col
            key={album.id}
            className="result-col col-3 d-flex align-content-center"
            onClick={() => onSelectAlbum(album)}
          >
            <div className="img-sml">
              <img
                className="result-img-search"
                src={album.images[1].url || placeholderImg}
                alt={`${album.name} album cover`}
              />
            </div>
            <div className="album-meta-res">
              <p className="title">{album.name}</p>
              <p className="name">
                {album.artists.map((artist) => artist.name).join(", ")}
              </p>
              <p className="year">Release Year: {album.release_date}</p>
            </div>
          </Col>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </Row>
  );
}

export default SearchResultComp;
