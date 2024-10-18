"use client";
import React, { useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

interface VideoJSProps {
  options: any;
  onReady: (player: any) => void;
}

export const VideoJS = ({ options, onReady }: VideoJSProps) => {
  const videoRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<any | null>(null);

  React.useEffect(() => {
    if (!playerRef.current) {
      const videoElement = document.createElement("video-js");

      videoElement.classList.add("vjs-big-play-centered");
      videoRef?.current?.appendChild(videoElement);

      const player = (playerRef.current = videojs(videoElement, options, () => {
        videojs.log("player is ready");
        onReady && onReady(player);
      }));
    } else {
      const player = playerRef.current;

      player.autoplay(options.autoplay);
      player.src(options.sources);
      player.muted(options.muted);
    }
  }, [options, videoRef]);

  React.useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player>
      <div ref={videoRef} />
    </div>
  );
};

export default VideoJS;
