import React, { useState, useEffect, useRef } from 'react';
import MgUpload from '../MgUpload';

const MyUpload = () => {
  const [fileList, setFileList] = useState([])

  const handleChange = ({ fileList }) => {
    const files = fileList.slice(0, 2)
    setFileList(files)
  }
  return (
    <div style={{ width: 400, height: '100%', padding: 24 }}>
      <MgUpload handleChange={handleChange} uploadType='accessory' multiple={true} length={5} />
    </div>
  )
}

export default MyUpload;