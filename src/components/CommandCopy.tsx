// src/CommandCopy.js
import React, { useState } from 'react';
import { MdOutlineContentCopy } from "react-icons/md";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { TbCopyCheckFilled } from "react-icons/tb";
import './style.css'


const CommandCopy = ({command}) => {
    const [copyStatus, setCopyStatus] = useState(false);

    const handelCopyStatus = async () => {
        setCopyStatus(true);

        setTimeout(() => setCopyStatus(false), 2000);
    }

  return (
    <div className='copy-container'>
      <span className='command'>{command}</span>
      <div onClick={handelCopyStatus}>
        <CopyToClipboard text={command}>
            {!copyStatus ? <MdOutlineContentCopy className='copy-icon' title="Copy to clipboard" /> : <TbCopyCheckFilled className='copy-icon'/>}
        </CopyToClipboard>

      </div>
    </div>
  );
};

export default CommandCopy;
