import React, { useRef } from 'react';

const Video = () => {
  const videoRef = useRef(null);

  const handleVideoEnded = () => {
    videoRef.current.play();
  };
  return (
    <div className='video-section'>
      <div className='info'>
        {/* Related Information */}

        <h2 className='video_head'>Working on Buildpacks to Make Builds</h2>
        <p>Here you can provide related information about how you are working on buildpacks to make builds.</p>
        <p>This could include descriptions, bullet points, or any other relevant information.</p>
        <p>Ages: You can mention the target age group for the content here.</p>
      </div>
      <div className='video'>
        <video
          width="500px"
          height="300px"
          src="https://collegemanage.s3.ap-south-1.amazonaws.com/812117/drawing/SecurePacks%20%281%29.mp4"
          autoPlay
          muted  // Added muted attribute
          playsInline
          onEnded={handleVideoEnded}
          ref={videoRef}
        ></video>
      </div>
    </div>
  );
}

export default Video;
