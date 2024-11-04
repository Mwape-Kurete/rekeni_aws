const axios = require("axios");

const getSpotifyAccessToken = async () => {
  console.log(
    "Client ID:",
    process.env.SPOTIFY_CLIENT_ID ? "Loaded" : "Missing"
  );
  console.log(
    "Client Secret:",
    process.env.SPOTIFY_CLIENT_SECRET ? "Loaded" : "Missing"
  );

  try {
    //requesting token
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        grant_type: "client_credentials",
      }).toString(),
      {
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(
              process.env.SPOTIFY_CLIENT_ID +
                ":" +
                process.env.SPOTIFY_CLIENT_SECRET
            ).toString("base64"),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    console.log("Token received:", response.data.access_token); // Log the token for debugging
    return response.data.access_token;
  } catch (error) {
    console.error(
      "Error fetching Spotify access token:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Failed to fetch Spotify access token");
  }
};

getSpotifyAccessToken()
  .then((token) => console.log("Token:", token))
  .catch(console.error);

module.exports = { getSpotifyAccessToken };
