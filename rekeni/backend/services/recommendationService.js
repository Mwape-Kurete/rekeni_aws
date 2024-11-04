const {
  searchSpotifyAlbums,
  searchSpotifyArtists,
  getTopAlbumsByArtist,
  getTopAlbumsByArtistSpotify,
} = require("./spotify"); // Ensure correct path
const {
  getAlbumsByArtist,
  getSearchedAlbum,
  getSimilarArtistsLastFm,
} = require("./lastfm");
const { getSimilarMusic } = require("./tastedive");

// Define functions
const getSimilarSpotify = async (albumQuery) => {
  return await searchSpotifyAlbums(albumQuery);
};

const getSimilarLastFM = async (albumQuery) => {
  return await getSearchedAlbum(albumQuery);
};

const getSimilarArtistsTasteDive = async (artistQuery) => {
  const artistNames = await getSimilarMusic(artistQuery);
  const artistRecommendations = [];

  for (const artistName of artistNames) {
    const topAlbums = await searchSpotifyAlbums(artistName);
    artistRecommendations.push({
      artist: artistName,
      topAlbums,
    });
  }

  return artistRecommendations;
};
//function to get artist recommendations -> fetches similar artists and their top albums

//spotify
const getArtistRecommendationsSpotify = async (artistQuery) => {
  try {
    const artists = await searchSpotifyArtists(artistQuery);
    if (!Array.isArray(artists) || artists.length === 0) {
      console.warn(`No artists found for query: ${artistQuery}`);
      return []; // Return an empty array if no artists are found
    }

    const artistRecommendations = [];
    for (const artist of artists) {
      const topAlbums = await getTopAlbumsByArtistSpotify(artist.name);
      artistRecommendations.push({
        artist: artist.name,
        topAlbums: Array.isArray(topAlbums) ? topAlbums : [], // Ensure topAlbums is always an array
      });
    }

    return artistRecommendations;
  } catch (error) {
    console.error(
      `Error in getArtistRecommendationsSpotify for "${artistQuery}":`,
      error
    );
    return []; // Return an empty array if an error occurs
  }
};

//lastFM
const getArtistRecommendationsLastFM = async (artistQuery) => {
  const artists = await getSimilarArtistsLastFm(artistQuery);
  const artistRecommendations = [];

  for (const artist of artists) {
    const topAlbums = await getAlbumsByArtist(artist.name);
    artistRecommendations.push({
      artist: artist.name,
      topAlbums,
    });
  }

  return artistRecommendations;
};

// Export the functions
module.exports = {
  getSimilarSpotify,
  getSimilarLastFM,
  getSimilarArtistsTasteDive,
  getArtistRecommendationsSpotify,
  getArtistRecommendationsLastFM,
};
