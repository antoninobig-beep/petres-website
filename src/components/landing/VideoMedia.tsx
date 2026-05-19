import { useRef, useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface VideoMediaProps {
  videoSrc: string;
  posterSrc: string;
  alt: string;
  className?: string;
}

const VideoMedia = ({ videoSrc, posterSrc, alt, className = "" }: VideoMediaProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const isMobile = useIsMobile();
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    if (videoRef.current && !isMobile) {
      videoRef.current.play().catch(() => setVideoFailed(true));
    }
  }, [isMobile]);

  if (isMobile || videoFailed) {
    return (
      <img
        src={posterSrc}
        alt={alt}
        className={`object-cover ${className}`}
        loading="lazy"
      />
    );
  }

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      poster={posterSrc}
      className={`object-cover ${className}`}
      onError={() => setVideoFailed(true)}
    >
      <source src={videoSrc} type="video/mp4" />
    </video>
  );
};

export default VideoMedia;
