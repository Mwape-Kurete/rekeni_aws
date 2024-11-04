import React, { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import "../Styles/ComponentStyles/search-results.css";
import placeholderImg from "../Asset/pexels-scenicspire-358690216-28216688.jpg";

function ArtistResultComp({ artist, albums, loading }) {
  console.log(
    `artist: ${artist} || albums:`,
    albums,
    `|| isLoading: ${loading}`
  );

  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  // Get the first album and the rest for display in the modal
  const firstAlbum = albums.length > 0 ? albums[0] : null;
  const remainingAlbums = albums.slice(1);

  return (
    <>
      {loading ? (
        <p>Loading... This might take a while, please wait.</p>
      ) : artist ? (
        <>
          {/* Main artist card */}
          <Row className="results-search-contain d-flex justify-content-center align-items-center">
            <Col
              className="result-col-discover col-4 d-flex align-items-center"
              onClick={handleShow}
            >
              <div className="img-sml">
                <img
                  className="result-img-search"
                  src={firstAlbum ? firstAlbum.artwork : placeholderImg}
                  alt={`${artist} main album cover`}
                />
              </div>
              <div className="album-meta-res">
                <h2 className="title">{artist}</h2>
                <p>Click to see top albums</p>
              </div>
            </Col>
          </Row>

          {/* Modal for top albums */}
          <Modal show={showModal} onHide={handleClose} centered>
            <Modal.Header closeButton>
              <Modal.Title>{artist}'s Top Albums</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {firstAlbum && (
                <>
                  <h3>Top Album</h3>
                  <div className="modal-album-item d-flex align-items-start">
                    <img
                      className="modal-img"
                      src={firstAlbum.artwork || placeholderImg}
                      alt={`${firstAlbum.title} album cover`}
                    />
                    <div className="modal-album-meta ms-3">
                      <h5>{firstAlbum.title}</h5>
                      <p>Release Date: {firstAlbum.releaseDate}</p>
                      <a
                        href={firstAlbum.albumUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-to-spotify"
                      >
                        View on Spotify
                      </a>
                    </div>
                  </div>
                </>
              )}
              <hr />
              {remainingAlbums.length > 0 && (
                <>
                  <h4>Other Top Albums</h4>
                  {remainingAlbums.map((album, index) => (
                    <div
                      key={index}
                      className="modal-album-item d-flex align-items-start"
                    >
                      <img
                        className="modal-img"
                        src={album.artwork || placeholderImg}
                        alt={`${album.title} album cover`}
                      />
                      <div className="modal-album-meta ms-3">
                        <h5>{album.title}</h5>
                        <p>Release Date: {album.releaseDate}</p>
                        <a
                          href={album.albumUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-to-spotify"
                        >
                          View on Spotify
                        </a>
                      </div>
                    </div>
                  ))}
                </>
              )}
              <Button
                className="mt-2 submitReviewBTN backBTNmodal"
                onClick={handleClose}
              >
                Go Back
              </Button>
            </Modal.Body>
          </Modal>
        </>
      ) : (
        <p>No albums found. Start a search above!</p>
      )}
    </>
  );
}

export default ArtistResultComp;
