// app/callback/page.js

"use client";
import React, { useEffect, useState } from "react";

const CallbackPage = () => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      const code = new URLSearchParams(window.location.search).get("code");
      if (!code) return;

      const verifier = localStorage.getItem("code_verifier") as string;
      const clientId = "bed3defecf5f4d6a90f1e070677af738";
      const redirectUrl = "http://localhost:3000/callback";

      try {
        const response = await fetch("https://accounts.spotify.com/api/token", {
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

        // Save tokens in localStorage or manage in session
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token);
        localStorage.setItem("expires_in", data.expires_in);

        // Redirect to a secured/home page
        window.location.href = "/";
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
