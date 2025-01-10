import { Music, Users, ThumbsUp, Headphones, Play, Radio } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-200 to-indigo-200 dark:from-purple-900 dark:to-indigo-900 transition-colors duration-300">
      <main>
        <section className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-purple-900 dark:text-purple-100 mb-6">
            Listen Together, Vote on Songs
          </h1>
          <p className="text-lg sm:text-xl text-purple-800 dark:text-purple-200 mb-8">
            Create and join music streams, collaborate on playlists, and
            discover new tunes with friends.
          </p>
          <Button className="bg-purple-900 text-white hover:bg-purple-800 dark:bg-purple-100 dark:text-purple-900 dark:hover:bg-purple-200 text-lg px-8 py-4">
            Start Streaming Now
          </Button>
        </section>

        <section id="features" className="bg-white dark:bg-gray-800 py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-purple-900 dark:text-purple-100 mb-12">
              Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-800 dark:to-indigo-800 p-6 rounded-lg shadow-lg">
                <Users className="mx-auto h-12 w-12 text-purple-900 dark:text-purple-100 mb-4" />
                <h3 className="text-xl font-semibold text-purple-900 dark:text-purple-100 mb-2">
                  Create Streams
                </h3>
                <p className="text-purple-800 dark:text-purple-200">
                  Start your own music stream and invite friends to join and
                  listen together.
                </p>
              </div>
              <div className="text-center bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-800 dark:to-indigo-800 p-6 rounded-lg shadow-lg">
                <ThumbsUp className="mx-auto h-12 w-12 text-purple-900 dark:text-purple-100 mb-4" />
                <h3 className="text-xl font-semibold text-purple-900 dark:text-purple-100 mb-2">
                  Vote on Songs
                </h3>
                <p className="text-purple-800 dark:text-purple-200">
                  Like or dislike upcoming songs to influence the playlist
                  order.
                </p>
              </div>
              <div className="text-center bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-800 dark:to-indigo-800 p-6 rounded-lg shadow-lg">
                <Headphones className="mx-auto h-12 w-12 text-purple-900 dark:text-purple-100 mb-4" />
                <h3 className="text-xl font-semibold text-purple-900 dark:text-purple-100 mb-2">
                  Spotify Integration
                </h3>
                <p className="text-purple-800 dark:text-purple-200">
                  Access millions of songs through our Spotify API integration.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-purple-900 dark:text-purple-100 mb-12">
              How It Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-purple-200 to-indigo-200 dark:from-purple-700 dark:to-indigo-700 p-6 rounded-lg shadow-lg">
                <div className="bg-purple-300 dark:bg-purple-600 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Play className="text-purple-900 dark:text-purple-100" />
                </div>
                <h3 className="text-xl font-semibold text-purple-900 dark:text-purple-100 mb-2">
                  1. Create a Stream
                </h3>
                <p className="text-purple-800 dark:text-purple-200">
                  Start a new music stream and set the initial playlist.
                </p>
              </div>
              <div className="bg-gradient-to-br from-purple-200 to-indigo-200 dark:from-purple-700 dark:to-indigo-700 p-6 rounded-lg shadow-lg">
                <div className="bg-purple-300 dark:bg-purple-600 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Users className="text-purple-900 dark:text-purple-100" />
                </div>
                <h3 className="text-xl font-semibold text-purple-900 dark:text-purple-100 mb-2">
                  2. Invite Friends
                </h3>
                <p className="text-purple-800 dark:text-purple-200">
                  Share your stream link with friends so they can join and
                  listen along.
                </p>
              </div>
              <div className="bg-gradient-to-br from-purple-200 to-indigo-200 dark:from-purple-700 dark:to-indigo-700 p-6 rounded-lg shadow-lg">
                <div className="bg-purple-300 dark:bg-purple-600 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Radio className="text-purple-900 dark:text-purple-100" />
                </div>
                <h3 className="text-xl font-semibold text-purple-900 dark:text-purple-100 mb-2">
                  3. Enjoy and Interact
                </h3>
                <p className="text-purple-800 dark:text-purple-200">
                  Listen together, vote on upcoming songs, and discover new
                  music.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-r from-purple-900 to-indigo-900 dark:from-purple-800 dark:to-indigo-800 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Start Your Musical Journey?
            </h2>
            <p className="text-xl mb-8">
              Join Muze Stream Box today and experience music like never before.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white text-purple-900 w-full sm:w-64"
              />
              <Button className="bg-white text-purple-900 hover:bg-purple-100 w-full sm:w-auto">
                Get Started
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-purple-900 dark:bg-purple-950 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Link href="/" className="text-2xl font-bold flex items-center">
                <Music className="mr-2" />
                Muze Stream Box
              </Link>
            </div>
            <div className="flex flex-wrap justify-center space-x-4">
              <Link href="#" className="hover:text-purple-300">
                About
              </Link>
              <Link href="#" className="hover:text-purple-300">
                Privacy
              </Link>
              <Link href="#" className="hover:text-purple-300">
                Terms
              </Link>
              <Link href="#" className="hover:text-purple-300">
                Contact
              </Link>
            </div>
          </div>
          <div className="mt-8 text-center text-sm">
            © {new Date().getFullYear()} Muze Stream Box. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
