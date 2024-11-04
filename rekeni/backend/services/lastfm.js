const axios = require("axios");
const LASTFM_API_KEY = process.env.LASTFM_API_KEY;
const BASE_URL = "http://ws.audioscrobbler.com/2.0/";

// Function to get similar artists from Last.fm based on a favorite artist
const getSimilarArtistsLastFm = async (artistName) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        method: "artist.getSimilar",
        artist: artistName,
        api_key: LASTFM_API_KEY,
        format: "json",
      },
    });

    return response.data.similarartists.artist;
  } catch (error) {
    console.error("Error fetching similar artists from Last.fm:", error);
    return [];
  }
};

// Function to search for albums by title
const getSearchedAlbum = async (albumTitle) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        method: "album.search",
        album: albumTitle,
        api_key: LASTFM_API_KEY,
        format: "json",
      },
    });

    return response.data.results.albummatches.album;
  } catch (error) {
    console.error("Error fetching albums from Last.fm:", error);
    return [];
  }
};

// New Function: Get albums by artist name from Last.fm
const getAlbumsByArtist = async (artistName) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        method: "artist.getTopAlbums",
        artist: artistName,
        api_key: LASTFM_API_KEY,
        format: "json",
      },
    });

    return response.data.topalbums.album; // Return top albums by artist
  } catch (error) {
    console.error("Error fetching albums by artist from Last.fm:", error);
    return [];
  }
};

module.exports = {
  getSimilarArtistsLastFm,
  getSearchedAlbum,
  getAlbumsByArtist,
};
