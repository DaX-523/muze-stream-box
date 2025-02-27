"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Music, Search, ThumbsUp, ThumbsDown, Share2, X } from "lucide-react";
import { toast, useToast } from "../hooks/use-toast";
import { useParams } from "next/navigation";
import { spotifyBaseUrl } from "../lib/constants";
import { getRefreshToken } from "../lib/spotify-auth-pkce";
interface SearchResults {
  id: string;
  name: string;
  artists: { name: string };
  album: { name: string };
  duration_ms: number;
  uri: string;
  preview_url: string;
}

interface QueueItem {
  id: string;
  name: string;
  artist: string;
  votes: number;
}

// Mock function to simulate Spotify API search
const searchSpotify = async (query: string) => {
  // In a real app, this would call the Spotify API
  const track = await fetch(
    spotifyBaseUrl + "/search?q=track:" + query + "&type=track",
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("spotify_access_token"),
      },
    }
  );
  if (track.status === 401) {
    localStorage.removeItem("spotify_access_token");

    await getRefreshToken();
  }
  const data = await track.json();
  console.log(data?.tracks?.items);
  return data?.tracks?.items;
};

export default function Stream({ canPlay }: { canPlay: boolean }) {
  const param = useParams();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResults[]>([]);
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [streamVotes, setStreamVotes] = useState(0);
  const [hasUserVoted, setHasUserVoted] = useState(false);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      toast({
        title: "Search query cannot be empty",
        description: "Please enter a search query",
        variant: "destructive",
      });
      return;
    }
    const results: SearchResults[] = await searchSpotify(searchQuery);
    setSearchResults(results);
  };

  const addToQueue = async (song: SearchResults) => {
    const newTrack = await fetch("/api/tracks", {
      method: "POST",
      body: JSON.stringify({
        trackId: song.id,
        streamId: param.id,
        name: song.name,
        duration: song.duration_ms,
        uri: song.preview_url,
      }),
    });
    if (newTrack.ok) {
      toast({
        title: "Track added to queue",
      });
    }
    const json = await newTrack.json();
    console.log("json", json);

    setQueue([...queue, json.track]);
  };

  const handleVote = (id: string, increment: number) => {
    setQueue(
      queue
        .map((song) =>
          song.id === id ? { ...song, votes: song.votes + increment } : song
        )
        .sort((a, b) => b.votes - a.votes)
    );
  };

  const refreshStream = async () => {
    console.log("parambrahm", param);

    const data = await fetch(`/api/streams?streamId=${param.id}`, {
      credentials: "include",
    });
    const json = await data.json();
    console.log("json", json);
    setStreamVotes(json?.stream?._count?.upvotes);
    setHasUserVoted(json?.hasUpvoted);
  };
  useEffect(() => {
    refreshStream();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleStreamVote = async (increment: number) => {
    try {
      if (increment < 0) {
        await fetch("/api/streams/downvote", {
          method: "POST",
          credentials: "include",
          body: JSON.stringify({ streamId: param }),
        });
      } else {
        await fetch("/api/streams/upvote", {
          method: "POST",
          credentials: "include",
          body: JSON.stringify({ streamId: param }),
        });
      }
      refreshStream();
      // setStreamVotes((prevVotes) => prevVotes + increment);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: "Check out this awesome music stream!",
      text: "Join me in listening to some great tunes.",
      url: "/listen/" + param.id,
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
                    disabled={hasUserVoted}
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
                    disabled={!hasUserVoted}
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
              <form onSubmit={handleSearch}>
                <div className=" flex space-x-2">
                  <Input
                    type="text"
                    placeholder="Search for a song..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-purple-50 dark:bg-purple-900 text-purple-900 dark:text-purple-100"
                  />
                  {searchQuery && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="relative text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-200"
                      onClick={() => setSearchQuery("")}
                    >
                      <X size={16} strokeWidth={3} />{" "}
                    </Button>
                  )}
                  <Button
                    type="submit"
                    className="bg-purple-300 text-purple-800  hover:bg-purple-400 dark:bg-purple-100 dark:text-purple-900 dark:hover:bg-purple-200"
                  >
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </div>
              </form>
              <div className="mt-4 space-y-2">
                {searchResults?.map((song) => (
                  <div
                    key={song.id}
                    className="flex justify-between items-center p-2 bg-purple-50 dark:bg-purple-800 rounded"
                  >
                    <div>
                      <p className="font-semibold text-purple-900 dark:text-purple-100">
                        {song.name}
                      </p>
                      <p className="text-sm text-purple-700 dark:text-purple-300">
                        {song.artists.name} - {song.album.name}
                      </p>
                    </div>

                    <Button
                      onClick={() => addToQueue(song)}
                      size="sm"
                      className="bg-purple-600 text-white hover:bg-purple-800 dark:bg-purple-100 dark:text-purple-900 dark:hover:bg-purple-200"
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
                {queue.length > 0 ? (
                  queue.map((song) => (
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
                  ))
                ) : (
                  <p className="text-purple-700 text-center dark:text-purple-300">
                    No songs in queue
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
