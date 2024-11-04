"use client";

import { useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Music, Search, ThumbsUp, ThumbsDown, Share2 } from "lucide-react";
import { useToast } from "@/app/hooks/use-toast";
import { useParams } from "next/navigation";
// import { spotifyBaseUrl } from "@/app/lib/constants";

// Mock function to simulate Spotify API search
const searchSpotify = async (query: string) => {
  // In a real app, this would call the Spotify API
  // const track = await fetch(spotifyBaseUrl + "/search?q=track:" + query, {
  //   headers: {
  //     'Authorization': "Bearer " + token
  //   }
  // })
  return [
    {
      id: "1",
      name: "Song 1",
      artist: "Artist 1",
      album: "Album 1",
      duration: "3:30",
    },
    {
      id: "2",
      name: "Song 2",
      artist: "Artist 2",
      album: "Album 2",
      duration: "4:15",
    },
    {
      id: "3",
      name: "Song 3",
      artist: "Artist 3",
      album: "Album 3",
      duration: "3:45",
    },
  ];
};

export default function Stream() {
  const param = useParams();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [queue, setQueue] = useState([
    { id: "4", name: "Queued Song 1", artist: "Artist 4", votes: 5 },
    { id: "5", name: "Queued Song 2", artist: "Artist 5", votes: 3 },
    { id: "6", name: "Queued Song 3", artist: "Artist 6", votes: 1 },
  ]);
  const [streamVotes, setStreamVotes] = useState(0);

  const handleSearch = async () => {
    const results = await searchSpotify(searchQuery);
    setSearchResults(results);
  };

  const addToQueue = (song) => {
    setQueue([...queue, { ...song, votes: 0 }]);
  };

  const handleVote = (id, increment) => {
    setQueue(
      queue
        .map((song) =>
          song.id === id ? { ...song, votes: song.votes + increment } : song
        )
        .sort((a, b) => b.votes - a.votes)
    );
  };

  // const handleStreamVote = (increment) => {
  //   setStreamVotes((prevVotes) => prevVotes + increment);
  // };

  const handleStreamVote = (increment: number) => {
    console.log("param", param);
    try {
      if (increment < 0) {
        fetch("/api/streams/downvote", {
          method: "POST",
          credentials: "include",
          body: JSON.stringify({ streamId: param }),
        });
      } else {
        fetch("/api/streams/upvote", {
          method: "POST",
          credentials: "include",
          body: JSON.stringify({ streamId: param }),
        });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: "Check out this awesome music stream!",
      text: "Join me in listening to some great tunes.",
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        toast({
          title: "Shared successfully!",
          description: "The stream link has been shared.",
        });
      } else {
        await navigator.clipboard.writeText(shareData.url);
        toast({
          title: "Link copied!",
          description: "The stream link has been copied to your clipboard.",
        });
      }
    } catch (error) {
      console.error("Error sharing:", error);
      toast({
        title: "Sharing failed",
        description: "There was an error sharing the stream link.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-200 to-indigo-200 dark:from-purple-900 dark:to-indigo-900 transition-colors duration-300">
      <main className="container mx-auto px-4 py-8">
        <Card className="bg-white dark:bg-gray-800 mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center space-x-2">
                <Music className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                <div>
                  <p className="font-semibold text-lg text-purple-900 dark:text-purple-100">
                    Current Song Title
                  </p>
                  <p className="text-purple-700 dark:text-purple-300">
                    Artist Name
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-purple-100 dark:bg-purple-800 rounded-full px-4 py-2">
                  <Button
                    onClick={() => handleStreamVote(1)}
                    size="sm"
                    variant="ghost"
                    className="text-purple-700 hover:text-purple-900 dark:text-purple-300 dark:hover:text-purple-100 p-1"
                  >
                    <ThumbsUp className="h-4 w-4" />
                  </Button>
                  <span className="text-purple-900 dark:text-purple-100 font-medium min-w-[2ch] text-center">
                    {streamVotes}
                  </span>
                  <Button
                    onClick={() => handleStreamVote(-1)}
                    size="sm"
                    variant="ghost"
                    className="text-purple-700 hover:text-purple-900 dark:text-purple-300 dark:hover:text-purple-100 p-1"
                  >
                    <ThumbsDown className="h-4 w-4" />
                  </Button>
                </div>
                <Button
                  onClick={handleShare}
                  variant="outline"
                  size="sm"
                  className="bg-purple-100 text-purple-900 hover:bg-purple-200 dark:bg-purple-800 dark:text-purple-100 dark:hover:bg-purple-700"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-purple-900 dark:text-purple-100">
                Search for Songs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-2">
                <Input
                  type="text"
                  placeholder="Search for a song..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-purple-50 dark:bg-purple-900 text-purple-900 dark:text-purple-100"
                />
                <Button
                  onClick={handleSearch}
                  className="bg-purple-900 text-white hover:bg-purple-800 dark:bg-purple-100 dark:text-purple-900 dark:hover:bg-purple-200"
                >
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
              <div className="mt-4 space-y-2">
                {searchResults.map((song) => (
                  <div
                    key={song.id}
                    className="flex justify-between items-center p-2 bg-purple-50 dark:bg-purple-800 rounded"
                  >
                    <div>
                      <p className="font-semibold text-purple-900 dark:text-purple-100">
                        {song.name}
                      </p>
                      <p className="text-sm text-purple-700 dark:text-purple-300">
                        {song.artist} - {song.album}
                      </p>
                    </div>
                    <Button
                      onClick={() => addToQueue(song)}
                      size="sm"
                      className="bg-purple-900 text-white hover:bg-purple-800 dark:bg-purple-100 dark:text-purple-900 dark:hover:bg-purple-200"
                    >
                      Add to Queue
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-purple-900 dark:text-purple-100">
                Upcoming Songs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {queue.map((song) => (
                  <div
                    key={song.id}
                    className="flex justify-between items-center p-3 pr-4 bg-purple-100 dark:bg-purple-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="bg-purple-200 dark:bg-purple-700 rounded-full p-2">
                        <Music className="h-5 w-5 text-purple-700 dark:text-purple-200" />
                      </div>
                      <div>
                        <p className="font-semibold text-purple-900 dark:text-purple-100">
                          {song.name}
                        </p>
                        <p className="text-sm text-purple-700 dark:text-purple-300">
                          {song.artist}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Button
                        onClick={() => handleVote(song.id, 1)}
                        size="sm"
                        variant="ghost"
                        className="text-purple-700 hover:text-purple-900 dark:text-purple-300 dark:hover:text-purple-100 p-1"
                      >
                        <ThumbsUp className="h-4 w-4" />
                      </Button>
                      <span className="text-purple-900 dark:text-purple-100 font-medium min-w-[2ch] text-center">
                        {song.votes}
                      </span>
                      <Button
                        onClick={() => handleVote(song.id, -1)}
                        size="sm"
                        variant="ghost"
                        className="text-purple-700 hover:text-purple-900 dark:text-purple-300 dark:hover:text-purple-100 p-1"
                      >
                        <ThumbsDown className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
