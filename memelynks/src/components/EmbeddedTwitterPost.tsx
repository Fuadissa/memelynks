import React from "react";
import Image from "next/image";
import { Tweet } from "react-tweet";
import type { TwitterComponents } from "react-tweet";

// Custom Components for react-tweet using Next.js Image
const components: TwitterComponents = {
  AvatarImg: (props) => <Image {...props} alt="avatar" />,
  MediaImg: (props) => <Image {...props} alt="media-img" fill unoptimized />,
};

// Utility Function to Extract Tweet ID from a Twitter URL
const extractTweetId = (url: string): string | null => {
  const match = url.match(/\/status\/(\d+)/); // Extracts the number after '/status/'
  return match ? match[1] : null;
};

type EmbeddedTweetProps = { tweetUrl: string; theme: string };

export default function EmbeddedTweet({ tweetUrl, theme }: EmbeddedTweetProps) {
  const tweetId = extractTweetId(tweetUrl);

  if (!tweetId) {
    return;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-lg" data-theme={`${theme}`}>
        <Tweet id={tweetId} components={components} />
      </div>
    </div>
  );
}
