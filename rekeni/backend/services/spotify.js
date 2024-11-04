const axios = require("axios");
const { getSpotifyAccessToken } = require("../oauth");

const searchSpotifyAlbums = async (albumQuery) => {
  const accessToken = await getSpotifyAccessToken();
  console.log("Spotify Access Token", accessToken);

  try {
    const response = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        q: albumQuery,
        type: "album",
      },
    });
    return response.data.albums.items;
  } catch (error) {
    console.error(
      "Error searching Spotify albums:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Failed to search Spotify albums");
  }
};

const searchSpotifyArtists = async (artistQuery) => {
  const accessToken = await getSpotifyAccessToken();
  console.log("Spotify Access Token", accessToken);

  try {
    const response = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        q: artistQuery,
        type: "artist",
      },
    });
    return response.data.artists.items;
  } catch (error) {
    console.error(
      "Error searching Spotify artists:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Failed to search Spotify artists");
  }
};

const getTopAlbumsByArtistSpotify = async (artistName) => {
  const accessToken = await getSpotifyAccessToken();
  console.log("Spotify Access Token", accessToken);

  try {
    // Search for the artist by name to get their ID
    const artistSearchResponse = await axios.get(
      "https://api.spotify.com/v1/search",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          q: artistName,
          type: "artist",
          limit: 1, // Only need the first result
        },
      }
    );

    const artist = artistSearchResponse.data.artists.items[0];
    if (!artist) {
      console.log(`Artist ${artistName} not found on Spotify`);
      return [];
    }
    const artistId = artist.id;

    // Fetch albums by artist ID
    const albumResponse = await axios.get(
      `https://api.spotify.com/v1/artists/${artistId}/albums`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          include_groups: "album", // Only fetch full albums, not singles or compilations
          market: "US",
          limit: 5, // Adjust as needed for the number of albums
        },
      }
    );

    // Extract and return relevant album data
    const topAlbums = albumResponse.data.items.map((album) => ({
      title: album.name,
      releaseDate: album.release_date,
      albumUrl: album.external_urls.spotify,
      artwork: album.images[0]?.url,
    }));

    return topAlbums;
  } catch (error) {
    console.error(
      "Error fetching top albums by artist from Spotify:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Failed to fetch top albums by artist on Spotify");
  }
};

const getNewReleases = async () => {
  const accessToken = await getSpotifyAccessToken();
  console.log("Spotify Access Token", accessToken);

  try {
    const response = await axios.get(
      "https://api.spotify.com/v1/browse/new-releases",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          market: "US",
        },
      }
    );

    return response.data.albums.items;
  } catch (error) {
    console.error(
      "Error fetching new releases from spotify",
      error.response ? error.response.data : error.message
    );
    throw new Error("Failed to retrieve New Releases");
  }
};

module.exports = {
  searchSpotifyAlbums,
  searchSpotifyArtists,
  getTopAlbumsByArtistSpotify,
  getNewReleases,
};
