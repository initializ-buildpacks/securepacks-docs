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
      
       <ul className='video_points'>
        <li >Bring your app to Securepack for seamless integration. Our platform effortlessly detects app modules, gathers dependencies, and swiftly constructs images, eliminating tedious build tool customization.</li>
 
 <li >Gain complete authority over OS, languages, and package management systems with Securepack's innovative buildpacks. Ensure adaptability for organizations of any size, optimizing workflow efficiency.</li>
  
 <li >Integrate Securepack into your CI process for effortless patching of app image OS layers. Avoid extensive source code rebuilding while ensuring security and stability.</li>
       </ul>
      </div>
      <div className='video'>
        <video
          className='video__player'
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
