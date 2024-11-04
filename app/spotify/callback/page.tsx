// app/callback/page.js

"use client";
import React, { useEffect, useState } from "react";
import {
  spotifyClientId,
  spotifyCallback,
  spotifyTokenUrl,
} from "../../lib/constants";

const CallbackPage = () => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      const code = new URLSearchParams(window.location.search).get("code");
      if (!code) return;

      const verifier = localStorage.getItem("code_verifier") as string;
      const clientId = spotifyClientId;
      const redirectUrl = spotifyCallback;

      try {
        const response = await fetch(spotifyTokenUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            client_id: clientId,
            grant_type: "authorization_code",
            code: code,
            redirect_uri: redirectUrl,
            code_verifier: verifier,
          }).toString(),
        });

        const data = await response.json();
        if (data.error) {
          setError(data.error);
          return;
        }
        console.log("data", data);

        // Save tokens in localStorage or manage in session
        localStorage.setItem("spotify_access_token", data.access_token);
        localStorage.setItem("spotify_refresh_token", data.refresh_token);
        localStorage.setItem("spotify_token_expiry", data.expires_in);

        // Redirect to a secured/home page
        window.location.href = "/dashboard";
      } catch (err) {
        console.error("Error fetching tokens", err);
        setError("Authorization failed.");
      }
    };

    handleCallback();
  }, []);

  return <div>{error ? error : <p>Loading...</p>}</div>;
};

export default CallbackPage;
