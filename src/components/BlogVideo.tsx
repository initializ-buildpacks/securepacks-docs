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
      src="https://collegemanage.s3.ap-south-1.amazonaws.com/812117/contract/securepacks---Whiteboard%20%281%29.mp4"
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