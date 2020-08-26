import React, { forwardRef } from 'react';
import "./index.css";

const MgUploadImage = (props) => {
  const {
    length = 30,
    files = [],
    inputRef,
    handleDelete = () => { },
  } = props

  return (
    <div className='mg-upload'>
      <div className='mg-upload-picture' >
        {files.map(item => <div key={item.uid} className='mg-upload-picture-content'>
          <div className='mg-upload-picture-content-shade'>
            <div className='mg-upload-picture-content-icon'>
              <span className='mg-upload-picture-content-icon-view' />
              <span className='mg-upload-picture-content-icon-delete' onClick={() => handleDelete(item)} />
            </div>
          </div>
          <img style={{ width: '100%', height: '100%' }} alt='' key={item.uid} src={item.url || window.URL.createObjectURL(item.originFileObj)} />
        </div>)}
        <div
          className='mg-upload-picture-select'
          style={{ display: files.length > length ? 'none' : 'flex' }}
          onClick={() => { inputRef.current.click() }}
        >
          <div className='mg-upload-picture-select-content-icon'></div>
          <div className='mg-upload-picture-select-content-text'>选择图片</div>
        </div>
      </div>
    </div>
  )
}

export default forwardRef(MgUploadImage);