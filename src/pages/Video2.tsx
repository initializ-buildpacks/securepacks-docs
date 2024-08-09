import React, { useRef } from 'react';
import { SiPowerautomate } from "react-icons/si";
import { BsFileEarmarkLock2 } from "react-icons/bs";
import { GoShieldCheck } from "react-icons/go";

const Video2 = () => {
  const videoRef = useRef(null);

  const handleVideoEnded = () => {
    videoRef.current.play();
  };
  return (
    <div className='video-section-b'>
      <div className='video-section-b content-container'>
       <div className='up video-section-b'>
        <div className='video-holder'>video </div>
        <div className='content-holder'>
            <div className="content-heading">Secure at it's Core</div>
            <div className="content-body">Securepacks' built-in security featues, minimal design and automated updates provide a strong foundation for you infrastructure's security strategy.</div>

        </div>

       </div>

       <div className='down video-section-b'>
        <div className='sub-content-contianer'>
            <div className='sub-head-contianer'>
                {/* <div className='sub-logo-holder'>logo</div> */}
                <SiPowerautomate  className='sub-logo-holder'/>
                <div className='sub-body-holder'>Security patch automation</div>
            </div>
            <div className='sub-body-contianer'>Running the latest security pathces in crucial to removing potential vulnerabilities. Securepacks automated updates does this for you.</div>
        </div>

        <div className='sub-content-contianer'>
            <div className='sub-head-contianer'>
                {/* <div className='sub-logo-holder'>logo</div> */}
                <BsFileEarmarkLock2  className='sub-logo-holder'/>
                <div className='sub-body-holder'>Immutable filesystem</div>
            </div>
            <div className='sub-body-contianer'>Immutable filesystem partition read-only, Secrepacks eliminates a whole class of high-impact security vulnerabilities.</div>
        </div>

        <div className='sub-content-contianer'>
            <div className='sub-head-contianer'>
                {/* <div className='sub-logo-holder'>logo</div> */}
                <GoShieldCheck  className='sub-logo-holder'/>                
                <div className='sub-body-holder'>Minimal attack surface</div>
            </div>
            <div className='sub-body-contianer'>Securpacks inludes only what is required to run containers. By minimizing the size and complexity of the OS, the attack surface is also reduced.</div>
        </div>


       </div>
      </div>
    </div>
  );
}

export default Video2;
