import React, { useEffect, useRef } from 'react';

const LazyVideo = ({ videoUrl }: {videoUrl: string}) => {
  const videoRef = useRef<any>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && videoRef.current) {
          const video = videoRef.current;
          video.childNodes[0].src = videoUrl; 
          video.load(); 
        }
      });
    }, { threshold: 0.5 });

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, [videoUrl]);

  return (
    <video ref={videoRef} controls preload="metadata"  crossOrigin="anonymous">
      <source type="video/mp4" /> {/* Type à ajuster si nécessaire */}
      {/* Autres sources si nécessaire */}
    </video>
  );
};

export default LazyVideo