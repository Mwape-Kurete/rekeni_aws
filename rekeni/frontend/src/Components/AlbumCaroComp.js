import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import placeholderImg from "../Asset/pexels-scenicspire-358690216-28216688.jpg";
import "../Styles/ComponentStyles/albumcarocard.css";

function AlbumCaroComp({ albumPropsCards, isLoading, isHomePage }) {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <p className="load">Loading recommendations... This may take a moment.</p>
    );
  }

  if (!albumPropsCards || albumPropsCards.length === 0) {
    return <p className="load">No albums to display.</p>;
  }

  const handleCardClick = (albumUrl, albumId) => {
    if (isHomePage) {
      navigate(`/singleAlbum?query=${albumId}`);
    } else {
      window.open(albumUrl, "_blank");
    }
  };

  return (
    <>
      {albumPropsCards.map((album) => {
        // Check if the data structure is for the home page
        if (album._id) {
          return (
            <Card
              key={album._id}
              style={{ width: "18rem", cursor: "pointer" }}
              className="bg-dark album-overlays mb-3"
              onClick={() => handleCardClick(null, album.spotifyId)}
            >
              <Card.Img
                src={album.artworkUrl || placeholderImg}
                alt={`Album cover for ${album.title}`}
              />
              <Card.ImgOverlay>
                <Card.Title>{album.title}</Card.Title>
                <Card.Text>
                  by: <span className="artist-name">{album.artist}</span>
                </Card.Text>
                <Card.Text>Released: {album.releaseDate}</Card.Text>
              </Card.ImgOverlay>
            </Card>
          );
        } else if (album.topAlbums) {
          // Check if the data structure is for the new page
          return album.topAlbums.map((topAlbum, index) => (
            <Card
              key={`${album.artist}-${index}`}
              style={{ width: "18rem", cursor: "pointer" }}
              className="bg-dark album-overlays mb-3"
              onClick={() => handleCardClick(topAlbum.albumUrl)}
            >
              <Card.Img
                src={topAlbum.artwork || placeholderImg}
                alt={`Album cover for ${topAlbum.title}`}
              />
              <Card.ImgOverlay>
                <Card.Title>{topAlbum.title}</Card.Title>
                <Card.Text>
                  by: <span className="artist-name">{album.artist}</span>
                </Card.Text>
                <Card.Text>Released: {topAlbum.releaseDate}</Card.Text>
              </Card.ImgOverlay>
            </Card>
          ));
        } else {
          return null;
        }
      })}
    </>
  );
}

export default AlbumCaroComp;
