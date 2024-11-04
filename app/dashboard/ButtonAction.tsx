// components/ActionButton.js
"use client";

import { useState } from "react";
import { Button } from "../components/ui/button";
import { useRouter } from "next/navigation";

export default function ActionButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    setLoading(true);
    try {
      const stream = await fetch("/api/streams", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          creatorId: "loml",
        }),
      });
      if (!stream.ok) throw new Error("Something Went wrong!");
      const json = await stream.json();
      console.log(json);
      router.push("/stream/" + json?.stream?.id);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      asChild
      onClick={handleClick}
      disabled={loading}
      className="bg-purple-900 text-white hover:bg-purple-800 dark:bg-purple-100 dark:text-purple-900 dark:hover:bg-purple-200"
    >
      <span>{loading ? "Processing..." : "Start a New Stream"}</span>
    </Button>
  );
}
