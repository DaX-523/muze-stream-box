"use client";
import React, { useEffect } from "react";
import {
  generateRandomString,
  generateCodeChallenge,
} from "../lib/spotify-auth-pkce";

const LoginPage = () => {
  useEffect(() => {
    const redirectToSpotifyAuthorize = async () => {
      const clientId = "bed3defecf5f4d6a90f1e070677af738";
      const redirectUrl = "http://localhost:3000/callback";
      const scope = "user-read-private user-read-email";

      const verifier = generateRandomString(128);
      localStorage.setItem("code_verifier", verifier);

      const challenge = await generateCodeChallenge(verifier);

      const authUrl = new URL("https://accounts.spotify.com/authorize");
      authUrl.searchParams.append("response_type", "code");
      authUrl.searchParams.append("client_id", clientId);
      authUrl.searchParams.append("scope", scope);
      authUrl.searchParams.append("code_challenge_method", "S256");
      authUrl.searchParams.append("code_challenge", challenge as string);
      authUrl.searchParams.append("redirect_uri", redirectUrl);

      window.location.href = authUrl.toString();
    };

    redirectToSpotifyAuthorize();
  }, []);

  return <p>Redirecting to Spotify...</p>;
};

export default LoginPage;
