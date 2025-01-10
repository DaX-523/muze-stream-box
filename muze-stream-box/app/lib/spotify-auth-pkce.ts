// utils/pkce.js

import { spotifyClientId, spotifyTokenUrl } from "./constants";

export const generateRandomString = (length: number) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const generateCodeChallenge = async (verifier: string | undefined) => {
  if (!verifier) return;
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const hashed = await window.crypto.subtle.digest("SHA-256", data);
  console.log("hashed", hashed);
  return btoa(
    String.fromCharCode.apply(null, Array.from(new Uint8Array(hashed)))
  )
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
};

export const isSpotifyTokenValid = () => {
  const spotifyAccessToken = localStorage.getItem("spotify_access_token");
  const tokenExpiry = localStorage.getItem("spotify_token_expiry");

  // Check if token exists and has not expired
  // console.log(spotifyAccessToken, tokenExpiry, );
  return spotifyAccessToken && tokenExpiry;
};

export const getRefreshToken = async () => {
  // refresh token that has been previously stored
  const refreshToken = localStorage.getItem("spotify_refresh_token") as string;
  const url = spotifyTokenUrl;

  const payload = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: spotifyClientId,
    }),
  };
  try {
    console.log(payload);

    const body = await fetch(url, payload);
    if (!body.ok) {
      console.log(body);

      throw new Error("Failed to refresh Spotify token");
    }
    const response = await body.json();
    console.log(response, response.access_token, response.refresh_token);
    localStorage.setItem("spotify_access_token", response.access_token);
    if (response.refreshToken) {
      localStorage.setItem("spotify_refresh_token", response.refresh_token);
    }
  } catch (error) {
    console.error("Error refreshing Spotify token:", error);
  }
};
