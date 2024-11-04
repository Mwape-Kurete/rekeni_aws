import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import placeholderImg from "../Asset/pexels-scenicspire-358690216-28216688.jpg";
import "../Styles/ComponentStyles/new-albums-card.css";

function NewAlbumCardComp({ albumProps = [] }) {
  const navigate = useNavigate();

  if (albumProps.length === 0) {
    return <p>No albums available</p>;
  }

  const handleCardClick = (albumId) => {
    navigate(`/singleAlbum?query=${albumId}`);
  };

  return (
    <div className="whole-new-album-cont py-3">
      {albumProps.map((album) => (
        <div
          className="d-flex justify-content-center new-album-box"
          key={album._id}
        >
          <div className="single-new-album-box py-3">
            <Row
              className="rating-layout align-items-center"
              onClick={() => handleCardClick(album.spotifyId)}
            >
              <Col xs={4} className="album-cover-sml-cont">
                <img
                  className="album-cover-small"
                  src={album.artworkUrl || placeholderImg}
                  alt={`Cover of ${album.title}`}
                />
              </Col>
              <Col className="album-meta-sml">
                <h6 className="title-small">
                  {album.title || "Unknown Title"}
                </h6>
                <p className="artist-small">
                  {album.artist || "Unknown Artist"}
                </p>
              </Col>
            </Row>
          </div>
        </div>
      ))}
    </div>
  );
}

export default NewAlbumCardComp;
