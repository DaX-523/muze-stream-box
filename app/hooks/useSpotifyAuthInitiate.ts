import { spotifyClientId, spotifyCallback } from "../lib/constants";
import {
  generateCodeChallenge,
  generateRandomString,
} from "../lib/spotify-auth-pkce";

export const redirectToSpotifyAuthorize = async () => {
  const clientId = spotifyClientId;
  const redirectUrl = spotifyCallback;
  const scope = "user-read-private user-read-email";

  const verifier = generateRandomString(128);
  localStorage.setItem("code_verifier", verifier);
  console.log("verifier", verifier);
  const challenge = await generateCodeChallenge(verifier);
  console.log("challenge", challenge);

  const authUrl = new URL("https://accounts.spotify.com/authorize");
  authUrl.searchParams.append("response_type", "code");
  authUrl.searchParams.append("client_id", clientId);
  authUrl.searchParams.append("scope", scope);
  authUrl.searchParams.append("code_challenge_method", "S256");
  authUrl.searchParams.append("code_challenge", challenge as string);
  authUrl.searchParams.append("redirect_uri", redirectUrl);
  console.log("spo", authUrl.toString());
  window.location.href = authUrl.toString();
};
