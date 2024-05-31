import React, { useRef } from 'react'

const BlogVideo = () => {
    const videoRef = useRef(null);

    const handleVideoEnded = () => {
      videoRef.current.play();
    };
  return (
    <div className='blog'>
    <video
      className='blog_video'
      src='https://s3.amazonaws.com/develop.securepacks.docs/videos/securepacks---Whiteboard+(1).mp4'
      autoPlay
      muted  // Added muted attribute
      playsInline
      onEnded={handleVideoEnded}
      ref={videoRef}
    ></video>
  </div>
  )
}

export default BlogVideo