import React, { useState, forwardRef, useRef } from "react";
import "./index.css";
import { uuids, download } from '../utils/utils'
import MgUploadAccessory from 'MgUploadAccessory';
import MgUploadImage from 'prop-types';
const imgBaseUrl = 'https://images.mogulinker.com';

function MgUpload(props, ref) {
  const { uploadType = 'accessory', } = props

  return (
    <>
      {uploadType === 'picture' ? <MgUploadImage {...props} /> : <MgUploadAccessory {...props} />}
    </>
  );
}

export default forwardRef(MgUpload);
