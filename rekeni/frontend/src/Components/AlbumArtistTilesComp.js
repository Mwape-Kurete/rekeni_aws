import React from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import placeholderImg from "../Asset/pexels-scenicspire-358690216-28216688.jpg";
import "../Styles/ComponentStyles/album-tile.css";

function AlbumArtistTilesComp({ topAlbums, setTopAlbums, userId }) {
  console.log(topAlbums);

  const handleRemove = async (albumId) => {
    try {
      const response = await axios.delete(`/api/favourites/${albumId}`, {
        data: { userId },
      });
      if (response.status === 200) {
        // Update the local state to remove the album from rendering
        setTopAlbums((prevAlbums) =>
          prevAlbums.filter((album) => album.albumId !== albumId)
        );
        console.log(`Album ${albumId} removed successfully`);
      }
    } catch (error) {
      console.error("Error removing album:", error);
    }
  };

  return (
    <>
      {topAlbums.map((album) => (
        <Card className="custom-card" key={album.albumId}>
          <Card.Img
            src={album.artworkUrl || placeholderImg}
            alt={`${album.title} cover`}
            className="card-img"
          />
          <Card.Body className="albumTile-meta">
            <Card.Title>{album.title}</Card.Title>
            <Card.Text>By: {album.artist}</Card.Text>
          </Card.Body>
          <Button
            variant="light"
            className="close-btn"
            onClick={() => handleRemove(album.albumId)}
            aria-label="Close"
          >
            <i className="bi bi-x"></i>
          </Button>
        </Card>
      ))}
    </>
  );
}

export default AlbumArtistTilesComp;
