import React, { forwardRef, } from "react";
import "./index.css";
import MgUploadAccessory from '../MgUploadAccessory';
import MgUploadImage from '../MgUploadImage';

function MgUpload(props, ref) {
  const { uploadType = 'accessory', } = props

  const mgUploadProps = {
    ...props
  }

  return (
    <>
      {uploadType === 'picture' ? <MgUploadImage {...mgUploadProps} ref={ref} /> : <MgUploadAccessory {...mgUploadProps} ref={ref} />}
    </>
  );
}

export default forwardRef(MgUpload);
