import AppBar from "./components/AppBar";
import LandingPage from "./components/landing-page";
import Providers from "./lib/providers";

export default function Home() {
  return (
    <Providers>
      <AppBar />
      <LandingPage />
    </Providers>
  );
}
